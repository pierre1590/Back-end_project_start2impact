const {validationResult} = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const path = require('path');
const fs = require('fs');

const Post = require('../models/post');
const User = require('../models/user');

// CREATE A POST BY USER
exports.createPost = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input parameters',
            error : errors.array()
        });
    }

    if(!req.file){
        return res.status(422).json({
            message : req.file.validationResult ? req.file.validationResult : 'No images attached',
    });
    }

    const title = req.body.title;
    const image = req.file.path.replace(/\\/g, '/');
    const description = req.body.description;
    const userId = req.userId;
    try {
        const post = await Post.create({
            title : title,
            image : image,
            description : description,
            userId : userId
        });
        res.status(201).json({
            message : 'Post created',
            post : post
        });
    } catch (err) {
        return res.status(422).json({
            message : 'Oops, something went wrong'
        });
    }
}

//DELETE A POST BY USER
exports.deletePost = async (req,res,next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findOne({
            where : {
                id : postId
            }
        });
        if(post.userId !== req.userId){
            return res.status(422).json({
                message : 'You are not authorized to delete this post'
            });
        }
        await post.destroy();
        res.status(200).json({
            message : 'Post deleted'
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
}

// UPDATE A POST BY USER
exports.updatePost = async (req,res,next) => {  
    const postId = req.params.postId;
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    try {
        const post = await Post.findOne({
            where : {
                id : postId
            }
        });
        if(post.userId !== req.userId){
            return res.status(422).json({
                message : 'You are not authorized to update this post'
            });
        }
        await post.update({
            title : title,
            image : image,
            description : description
        });
        res.status(200).json({
            message : 'Post updated',
            post : post
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
}

// GET ALL POSTS
exports.getAllPosts = async (req,res,next) => { 
    try {
        const posts = await Post.findAll({
            include : [{
                model : User,
                attributes : ['id','first_name','last_name','username','email']
            }]
        });
        res.status(200).json({
            message : 'All posts',
            posts : posts
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
}

// GET ALL POSTS BY ME
exports.getAllPostsByMe = async (req,res,next) => {
    try {
        const posts = await Post.findAll({
            where : {
                userId : req.userId
            },
            include : [{
                model : User,
                attributes : ['id','first_name','last_name','username','email']
            }]
        });
        res.status(200).json({
            message : 'All posts by me',
            posts : posts
        });
    } catch (err) {
        return res.status(422).json({
            message : err
        });
    }
}