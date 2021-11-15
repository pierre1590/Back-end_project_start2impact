// routes authentication
const authRoutes = require('./auth');


module.exports = function(app) {
    app.use('/auth', authRoutes);
};

