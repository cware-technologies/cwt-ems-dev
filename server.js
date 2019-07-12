const express = require('express');
const path = require('path');
const { connectMySQL } = require('./config/database.js');
const cors = require('cors');
const passport = require('passport');
const { errorHandler } = require('./middleware');

const app = express();

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
    app.use(errorHandler);
    app.listen(process.env.PORT || 3001, () => {
        console.log('Listening On Port 3001...');
    });
}, 
err => {
    console.log(err)
    process.exit(1);
})