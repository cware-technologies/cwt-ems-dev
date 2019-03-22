const express = require('express');
const path = require('path');
const { connectMySQL } = require('./config/database.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

connectMySQL()
.then(sequelize => {
    require('./routes')(app, sequelize);
    app.listen(process.env.PORT || 3001, () => {
        console.log('Listening On Port 3001...');
    });
}, 
err => {
    console.log(err)
    process.exit(1);
})