const express = require('express');
const path = require('path');
const { connectMySQL } = require('./config/database.js');
const cors = require('cors');
const passport = require('passport');
const { errorHandler } = require('./middleware');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('./config/passport')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

connectMySQL()
.then(sequelize => {
    require('./routes')(app, sequelize);
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    app.use(errorHandler);
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Listening On Port ${process.env.PORT || 3000}...`);
    });
}, 
err => {
    console.log(err)
    process.exit(1);
})