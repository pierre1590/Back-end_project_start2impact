const express = require('express');
const { body,query } = require('express-validator/check');
const router = express.Router();

const authController = require('../controllers/auth.js');
const User = require('../models/user');

const isAuth = require('../middleware/is-auth.js');


//POST /auth/register
router.post('/register',
    [
        body('email').isEmail().withMessage('')
        .custom((value,{ req }) => {
            return User.findOne( { where : { email : value}}).then(user => {
                if(user){
                    return Promise.reject('Email Esistente!!!');
                }
            })
        }),
        body('password').trim().isLength({ min : 5}).withMessage('Password > 5 Caratteri'),
    ],
    authController.registerUser);

router.post('/login',
    [
        body('email').isEmail().withMessage('Inserisci una mail valida name@server.com'),
        body('password').trim().isLength({ min : 5}).withMessage('Password > 5 Caratteri')
    ],
   authController.loginUser);



module.exports = router;