const express = require('express');
const { body,query } = require('express-validator/check');
const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/user');




//POST /auth/register
router.post('/register',
    [
        body('first_name').trim().not().isEmpty().isLength({min:5}).withMessage('First name is required and must be greater than five characters'),
        body('last_name').trim().not().isEmpty().isLength({min:5}).withMessage('Last name is required and must be greater than five characters'),
        body('username').trim().not().isEmpty().isLength({min:5}).withMessage('Username is required and must be greater than five characters')
            .custom((value,{req}) => {
                return User.findOne({ where:{username:value}}).then(user => {
                    if(user){
                      return Promise.reject('Username already exists');
                    }
                })
            }),                                              
        body('email').isEmail().withMessage('Enter a valid email john@doe.com')
        .custom((value,{ req }) => {
            return User.findOne( { where : { email : value}}).then(user => {
                if(user){
                    return Promise.reject('Existing email');
                }
            })
        }),
        body('password').trim().isLength({ min : 5}).withMessage('The password must be greater than five characters and must have an uppercase character and a special character.')  
    ],
    authController.registerUser);

//POST /auth/login
router.post('/login',
    [
        body('email').isEmail().withMessage('Enter a valid email john@doe.com'),
        body('password').trim().isLength({ min : 5}).withMessage('The password must be greater than five characters and must have an uppercase character and a special character.')
    ],
   authController.loginUser);



module.exports = router;