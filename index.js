const express = require('express') ;
const dotenv = require('dotenv').config() ;
const session = require('express-session') ;
const app = express() ;
const PORT = process.env.PORT ;
const SESSION_SECRET = process.env.SESSION_SECRET ;
const EmitterEvent = require('node:events') ;
const emitter = new EmitterEvent() ;
const ejs = require('ejs') ;
const userRouter = require('./routes/userRoutes') ;
const xss = require('xss-clean') ;
const mongoose = require('mongoose') ;

//*  ---------------------- Connect The database ---------------------- 
mongoose.connect(`mongodb://localhost:27017/user`).then(() => {
    console.log('The connection with database has been approved with success') ;
}).catch((error) => {
    console.log('There is an error' , error) ;
}) ;

//*  ------------------------ Use Middleware ------------------------- 
app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ;
app.set('view engine' , 'ejs') ;
app.use(session({
    secret : SESSION_SECRET ,
    cookie : {
        maxAge : 300000 ,
        sameSite : 'strict' ,
    } ,
    saveUninitialized : true ,
})) ;
app.use(xss()) ;
app.use(userRouter) ;
app.use(express.static(__dirname + '/public')) ;

emitter.on('serverIsRunningWithSuccess' , ( port ) => {
    console.log(`The server is running on http://localhost:${port}`) ;
})

app.listen(PORT , emitter.emit('serverIsRunningWithSuccess' , PORT)) ;





// <% if ( errors ) { %>
//         <% errors.map((error) => {  %>
//             <div class="container alert alert-warning alert-dismissible fade show" role="alert">
//                 <strong> Warning </strong> <%= error.msg %>
//                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//         <% }) %>
//     <% } %>