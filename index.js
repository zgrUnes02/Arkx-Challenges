
const express = require('express') ;
const app = express() ;
const dotenv = require('dotenv').config() ;
const PORT = process.env.PORT || 3001 ;

app.listen(PORT , () => {
    console.log(`The server is running on localhost:${PORT}`)
}) ;

app.get('/' , (req , res) => {
    res.status(200).send('Hello World') ;
}) ;

