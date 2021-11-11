const db = require('../utils/db.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const User = db.users;

// FETCH ALL Users
exports.findAll = (req, res) => {
    User.findAll().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}

// Find a User by id
exports.findById = (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });

   // Update a User
exports.update = (req, res) => {
    const id = req.params.userId;
    User.update( { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email }, 
    { where: {id: req.params.userId} }
    ).then(() => {
    res.status(200).send({ message: 'updated successfully a user with id = ' + id });
    });
   };
    
   // Delete a User by Id
   exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send({ message: 'deleted successfully a user with id = ' + id });
    });
   };
    
    
    
   exports.signup = (req, res) => {
    //Check Email
       User.findOne({
    where: {
      email: req.body.email
    }
      }).then(user => {
    if (user) {
      res.status(400).send({message: "Failed! Email is already in use!"});
    }else{
    //create User
    User.create({
    
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
    res.status(200).send({ message: "User was registered successfully!" });
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
    });
    }
    }); 
     };
    
    
     exports.signin = (req, res) => {
    User.findOne({
      where: {
    email: req.body.email
      }
    })
      .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }else{
    var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
    );
    
    if (!passwordIsValid) {
    return res.status(401).send({
    accessToken: null,
    message: "Invalid Password!"
    });
    }
    var token = jwt.sign({ id: user.id }, env.JWT_ENCRYPTION, {
    expiresIn:60 * 60 * 24 // 24 hours
    });
    
    res.status(200).send({
    id: user.id,
    email: user.email,
    accessToken: token
    });
    }
    
      })
      .catch(err => {
    res.status(500).send({ message: err.message });
      });
     };
    }