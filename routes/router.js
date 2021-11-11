const auth = require('../middleware/auth.js');
module.exports = function(app) {
    const users = require('../controller/user.controller.js');
  
    // Retrieve all User
    app.get('/auth/users',auth, users.findAll);
    // Retrieve a single User by Id
    app.get('/auth/users/:userId', users.findById);
    // Update a User with Id
    app.put('/auth/users/:userId',auth, users.update);
    // Delete a User with Id
    app.delete('/auth/users/:userId',auth, users.delete);
 
    // User signup
    app.post('/auth/user/signup', users.signup);
    
    // User signin
    app.post('/auth/user/signin', users.signin);
}