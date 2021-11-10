const Sequelize = require('sequelize');

const sequelize = require('../utils/db.js');

const User = sequelize.define('user',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    email : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
    password : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
});

module.exports = User;