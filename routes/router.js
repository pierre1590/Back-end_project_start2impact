const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../utils/db.js');
const userMiddleware = require('../middleware/users.js');

//ENDPOINT SIGNUP
// http://localhost:3000/auth/signup
router.post('/signup', (req, res,next) => {

});

//ENDPOINT LOGIN
// http://localhost:3000/auth/login
router.post('/login', (req, res,next) => {

});


//ENDPOINT SECRET  ROUTE
// http://localhost:3000/auth/secret
router.post('/secret', (req, res,next) => {

});