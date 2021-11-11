const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

const db = require('../utils/db.js');
// force: true will drop the table if it already exists
 db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
});

// api routes
app.get('/',(req,res)=>{
        res.json({messagge: "Welcome to my App"});
});
    
require('../routes/router.js')(app);

// set port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
