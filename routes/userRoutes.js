const express = require('express') ;
const userRouter = express.Router() ;
const { body , validationResult } = require('express-validator');
const userModel = require('../models/userModel');
const session = require('express-session');

//* --------------------------- login ------------------------------
userRouter.post('/login' , [
    body('email')
        .trim()
        .isEmail().withMessage('please enter an email')
        .notEmpty().withMessage('the email field is required') ,
    body('password')
        .trim()
        .notEmpty().withMessage('please enter the password')
] , async (req , res) => {
    const errors = validationResult(req) ;
    if ( !errors.isEmpty() ) {
        res.render('login' , {errors : errors.array()}) ;
    }
    else {
        try {
            const { email , password } = req.body ; 
            const userExists = await userModel.find({email : email , password : password}) ;
            if ( userExists.length == 1 ) {
                req.session.user = userExists[0] ;
                req.session.authorized = true ;
                res.redirect('/profile') ;
            }
            else {
                res.status(400).send('the credentials not valid !') ;
            }
        }
        catch ( error ) {
            res.status(500).json({error : error}) ;
        }
    } 
}) ;

//* ---------------------------- logout -----------------------------
userRouter.get('/logout' , (req , res) => {
    try {
        req.session.destroy() ;
        res.redirect('/') ;
    }
    catch ( error ) {
        res.status(500).send('something went wrong in the "/logout" route') ;
    }
}) ;


userRouter.get('/' , (req , res) => {
    if ( req.session.authorized ) {
        res.redirect('/profile') ;
    }
    else {
        res.render('login') ;
    }

}) ;

userRouter.get('/profile' , (req , res) => {
    if ( req.session.authorized ) {
        res.render('profile' , {user : req.session.user}) ;
    }
    else {
        res.redirect('/') ;
    }
}) ;


module.exports = userRouter ;
