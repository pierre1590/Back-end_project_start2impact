const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const app = express();


app.use(bodyParser.json()); //application/json

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

//Routing
app.use('/',router);
require('./routes')(app);

const Post = require('./models/post');
const User = require('./models/user');

User.hasMany(Post);
Post.belongsTo(User);






sequelize.authenticate().then( rec => {
    console.log('Connessione Stabilita con Successo');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then(user => {
        console.log('Sync al DB con Successo');
    }).catch( err => {
        console.log('Sync al DB Error:',err);
    });
}).catch( err => {
     console.log('Connession al DB Error:',err);
});

app.listen(process.env.PORT || 8080);
