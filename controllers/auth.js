const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');




exports.loginUser = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input ',
            error : errors.array()
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    let loginUser;

    User.findOne( { where : { email : email}}).then(user => {
        if(!user){
            return res.status(401).json({
                message : 'You are not authorized, incorrect email'
            });
        }
        loginUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            return res.status(401).json({
                message : 'You are not authorized, incorrect password'
            });
        }
        const token = jwt.sign(
            {
                id : loginUser.id,
                email : loginUser.email,
            },'',{expiresIn : '1h'});

        res.status(201).json({ 
            messages : 'You are logged in successfully',
            id : loginUser.id,
            token : token,
        });
    })
    .catch(err => {
        return res.status(422).json({
            message : err
        });
    });

};

exports.registerUser = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input ',
            error : errors.array()
        });
    }

    const email = req.body.email;
    
    const password = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedPassword => {
        User.create({  email : email,password : hashedPassword})
        .then(user => {
            res.status(201).json({ 
                messages : 'Success Operation',
                email: email
            });
        })
        .catch(err => {
            return res.status(422).json({
                message : err
            });
        });
    })
    .catch(err => {
        return res.status(422).json({
            message : err
        });
    });
};