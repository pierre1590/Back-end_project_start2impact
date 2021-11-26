// routes authentication
const authRoutes = require('./auth');
const feedRoutes = require('./feed');

module.exports = function(app) {
    app
    .use('/auth', authRoutes)
    .use('/feed', feedRoutes);
};


