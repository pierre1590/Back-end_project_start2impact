const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken'); 
 
verifyToken = (req, res, next) => {
 let token = req.headers['x-access-token'] || req.headers['authorization'];
 if(token && token.startsWith('Bearer ')){
 token = token.slice(7, token.length)
 }
 if (!token) {
   return res.status(403).send({
 message: "A token is required for authentication"
   });
 }
 
 jwt.verify(token,'6028QJ1rDVXXepHll7Wf3AoDaoz4ZzWi' , (err, decoded) => {
   if(err){
 console.log(err);
 return res.status(401).send({
   message: "Invalid Token!"
 });
   }else{
 req.user = decoded.id;
 next();
 //res.status(200).send({ message: "successs" });
   }
 });
};
 
module.exports = verifyToken;