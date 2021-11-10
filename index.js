const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const sequelize = require('./utils/db');

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

//Routing
app.use('/auth',router);


const User = require('./models/user');

sequelize.authenticate().then( rec => {
    console.log('Connection Established Successfully');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then(user => {
        console.log('Sync to DB with Success');
    }).catch( err => {
        console.log('Sync to DB Error:',err);
    });
}).catch( err => {
     console.log('Connection to DB Error:',err);
});

app.listen(process.env.PORT || 5000);
