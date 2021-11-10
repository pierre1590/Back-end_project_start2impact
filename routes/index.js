const authRoutes = require('../controllers/auth.js');

module.exports = function(app) {
   app.use('/auth',authRoutes);
}