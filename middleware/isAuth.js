const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    console.log('Authorization middleware');
    console.log(req.get('Authorization'));

    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({
            message: 'No token provided.'
        });
    }


const token = auth.split(' ')[1];

let decode;

try{
    decode = jwt.verify(token, 'Bd7uu0JMIsaOerYpUmrLMZFiUyieQzRi');
    console.log(decode);
} catch(err){
    return res.status(500).json({
        message: err
    });
}

if(!decode) {
    return res.status(401).json({
        message: 'Invalid token.'
    });
}

let userId = decode.userId;
User.findByPk(userId)
.then(user => {
    if(!user) {
        return res.status(401).json({
            message: 'User not found.'
        });
    }
    req.user = user;
    next();
})
};
