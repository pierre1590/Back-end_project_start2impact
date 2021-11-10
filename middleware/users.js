const jwt = require('jsonwebtoken');
const {body,query} = require('express-validator');

module.exports = {
    validateRegister: (req, res, next) => {
            // username min length 3 
                body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
            //password min length 6    
                body('password').trim().isLength({ min:6}).withMessage('Password must be at least 6 characters long.'),
            //password_repeat equal password   
                body('password_repeat').trim().notEqual('password').withMessage('Passwords do not match.')
    },
    next();
};