const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



// Login ME
exports.loginMe = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input parameters',
            error : errors.array()
        });
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where : {
                email : email
            }
        });
        if(!user){
            return res.status(422).json({
                message : 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(422).json({
                message : 'Invalid password'
            });
        }
        const token = jwt.sign({
            userId : user.id,
            email : user.email
        },'Bd7uu0JMIsaOerYpUmrLMZFiUyieQzRi',{
            expiresIn : '1h'   
        });
        res.status(200).json({
            message : 'User logged in',
            token : token,
            user : user
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
}

// Login with try/catch and async/await
exports.loginUser = async (req,res,next) => {
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

    try {
        loginUser = await User.findOne( { where : { email : email}});
        if(!loginUser){
            return res.status(401).json({
                message : 'Unauthorized, Wrong Email !!!'
            });
        }
        const isEqual = await bcrypt.compare(password,loginUser.password);
        if(!isEqual){
            return res.status(401).json({
                message : 'Unauthorized, Wrong Password !!!'
            });
        }
        const token = jwt.sign(
            {
                id : loginUser.id,
                email : loginUser.email,
            },'Bd7uu0JMIsaOerYpUmrLMZFiUyieQzRi',{expiresIn : '1h'});

        res.status(201).json({ 
            messages : 'You are logged in',
            id : loginUser.id,
            Firstname : loginUser.first_name,
            Lastname : loginUser.last_name,
            username : loginUser.username,
            email : loginUser.email,
            token : token,
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
};

// Logout User
 exports.logoutUser = async(req,res,next) => {
   //retrieve the user id and delete the token
    const userId = req.userId;
    const token = req.token;
    try {
        await User.update({
            token : null
        },{
            where : {
                id : userId
            }
        });
        res.status(200).json({
            message : 'You are logged out!'
        });
    }
    catch (err) {
        return res.status(422).json({
            message : err
        });
    }
};
        
  


// Register with try/catch and async/await
exports.registerUser = async (req,res,next) => {
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

    try {
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({
            first_name : first_name,
            last_name:last_name,
            username : username,
            email : email,
            password : hashedPassword
        });
        res.status(201).json({
            message : 'User created successfully',
            user : newUser
        });
    } catch (err) {
        res.status(422).json({
            message : err
        });
    }
}
