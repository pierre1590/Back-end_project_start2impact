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
        req.fileValidationError = 'Invalid file type';
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
    imgUpload,
    [
        body('title').trim().not().isEmpty().isLength({min:5}).withMessage('Title is required and must be greater than five characters'),      
        body('description').trim().not().isEmpty().isLength({min:5}).withMessage('Description is required and must be greater than five characters')
    ],
    isAuth,
    feedController.createPost);

// UPDATE /feed/posts/:postId
router.put('/posts/:postId',
    [
        body('title').trim().not().isEmpty().isLength({min:5}).withMessage('Title is required and must be greater than five characters'),       
        body('description').trim().not().isEmpty().isLength({min:5}).withMessage('Description is required and must be greater than five characters')
    ],
    isAuth,
    feedController.updatePost);

// DELETE /feed/posts/:postId
router.delete('/posts/:postId', 
    isAuth,
    feedController.deletePost);

// GET All /feed/posts
router.get('/posts',
    isAuth,
    feedController.getAllPosts);

// GET ALL /feed/posts by me 
router.get('/posts/me',
    isAuth,
    feedController.getAllPostsByMe);

