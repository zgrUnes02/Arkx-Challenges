
const express = require('express') ;
const app = express() ;
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT || 4001 ;
const fs = require('fs') ;

app.use(express.json()) ;

const followInformationMiddleware = (req , res , next) => {
    try {
        const date = new Date() ;
        const content = `\nThe Date Of Request : ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
                      + `\nThe Method Of Request : ${req.method}`
                      + `\nThe Url Of Request : ${req.url}\n`
                      + `------------------------------------------------\n` ;
        fs.appendFile('requestInformationFile.txt' , content , ( err ) => {
            if ( err ) {
                res.status(500).json({
                    error : err ,
                }) ;
            }
        }) ;
    }
    catch ( error ) {
        res.status(404).json({
            'succes' : false ,
            'status' : 404 ,
            'message' : error.message
        }) ;
    }
    next() ;
}


let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];
  
  //* ----------------- Get All Products -----------------
  app.get('/products' , followInformationMiddleware , (req , res) => {
      res.status(200).json(products) ;
  })
  
  //* --------------- Get Specific Product ----------------
  app.get('/products/:id' , followInformationMiddleware , async (req , res) => {
      const { id } = req.params ;
      try {
          const productNeedToShow = await products.find(product => product.id == id) ;
          if ( productNeedToShow ) {
              res.status(200).json(productNeedToShow) ;
          }
          else {
              res.status(404).json({'message' : 'There Is No Product With This ID'}) ;
          }
      }
      catch ( error ) {
          res.status(404).json({error : error}) ;
      }
      
      
  })
  
  //* ----------------- Add New Product ------------------
  app.post('/products' , followInformationMiddleware , (req , res) => {
      const { name , price } = req.body ;
      const id = products[products.length - 1].id + 1 ;
      try {
          products.push({
              id : id ,
              name : name ,
              price : price 
          }) ;
          res.status(200).json({'message' : `The Product ${name} Has been Added With Success`}) ;
      }
      catch ( error ) {
          res.status(404).json({error : error}) ;
      }
  }) ;
  
  //* ----------------- Update a Product ------------------
  app.put('/products/:id' , followInformationMiddleware , (req , res) => {
      const { id } = req.params ;
      const { name , price } = req.body ;
      try {
          products = products.map(product => {
              if ( product.id == id ) {
                  product.name = name ;
                  product.price = price ;
              }
              return product ;
          }) ; 
          res.status(200).json({'message' : `The Product Has been Updated With Success`}) ;
      }
      catch ( error ) {
          res.status(404).json({error : error}) ;
      }
  }) ;
  
  //* ----------------- Delete a Product ------------------
  app.delete('/products/:id' , followInformationMiddleware , (req , res) => {
      const { id } = req.params ;
      try {
          products = products.filter( product => product.id != id ) ; 
          res.status(200).json({'message' : `The Product Has been Deleted With Success`}) ;
      }
      catch ( error ) {
          res.status(404).json({error : error}) ;
      }
  }) ;
  
  //* ----------------- Search a Product ------------------
  app.get('/search' , followInformationMiddleware , (req , res) => {
      const { maxPrice , minPrice } = req.query ;
      try {
          const productsSearched = products.filter( product => product.price < maxPrice && product.price > minPrice )
          res.status(200).json(productsSearched) ;  
      }
      catch ( error ) {
          res.status(404).json({error : error}) ;
      }
      
  }) ;


app.listen(PORT , () => {
    console.log(`The server is running on localhost:${PORT}`) ;
});