const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator/check');
const isAuth = require('../middleware/isAuth');
const feedController = require('../controllers/feed');

// UPLOAD AN IMAGE
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../public/img/'));
    },
    filename : (req,file,cb) => {
        cb(null,uuid.v4() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        req.fileValidationError = 'Extension not allowed only: image/png | image/jpg |  image/jpeg';
        cb(null,false);
    }
};

var upload = multer({
    storage : storage,
    fileFilter : fileFilter
});
    


// POST /feed/posts 
var imgUpload = upload.single('image');
router.post('/posts',
    isAuth,
    imgUpload,
    [
    body('title').trim()
    .isLength({min:5}).withMessage('Title must be at least 5 characters long'),
    body('description').trim()
    .isLength({ min : 5}).withMessage('Description must be at least 5 characters long'),
    ],
    feedController.createPost);

// UPDATE /feed/posts/:postId
router.put('/posts/:postId',
    isAuth,
    imgUpload,
    [
        body('title').trim()
        .isLength({min:5}).withMessage('Title must be at least 5 characters long'),
        body ('description').trim()
        .isLength({ min : 5}).withMessage('Description must be at least 5 characters long'), 
    ],
    feedController.updatePost);

// DELETE /feed/posts/:postId
router.delete('/posts/:postId', 
    isAuth,    
    feedController.deletePost);

// GET All /feed/posts
router.get('/posts',
    [isAuth],
    feedController.getAllPosts);


    module.exports = router;