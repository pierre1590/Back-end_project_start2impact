const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.loginMe = (req,res,next) => {
    req.user.password = '**********';
    res.status(200).json({ 
        user : req.user,
    });
};


exports.loginUser = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input parameters',
            error : errors.array()
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    let loginUser;

    User.findOne( { where : { email : email}}).then(user => {
        if(!user){
            return res.status(401).json({
                message : 'Unauthorized, Wrong Email !!!'
            });
        }
        loginUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            return res.status(401).json({
                message : 'Unauthorized, Wrong Password !!!'
            });
        }
        const token = jwt.sign(
            {
                id : loginUser.id,
                email : loginUser.email,
                name : loginUser.name
            },'Bd7uu0JMIsaOerYpUmrLMZFiUyieQzRi',{expiresIn : '1h'});

        res.status(201).json({ 
            messages : 'You are logged in',
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
            message : 'Error input parameters',
            error : errors.array()
        });
    }


    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedPassword => {
        User.create({first_name : first_name,last_name : last_name,username : username,email : email,password : hashedPassword})
        .then(user => {
            res.status(201).json({ 
                messages : 'Success Operation',
                user : user
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