const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.NODE_DATABASE,
process.env.NODE_DATABASE_USER,
process.env.NODE_DATABASE_PW,{
    dialect : 'mysql',
    host : process.env.NODE_DATABASE_URL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require('../models/user.js')(sequelize, Sequelize);

module.exports = db;