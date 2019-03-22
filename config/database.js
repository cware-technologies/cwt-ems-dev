const mysql = require('mysql');
const Sequelize = require('sequelize');

function connectMySQL() {
    return new Promise((resolve, reject) => {
        const sequelize = new Sequelize('EMS', 'root', 'cwaret155,', {
            host: 'localhost',
            dialect: 'mysql',
        });

        // var conn = mysql.createConnection({
        //     host: "SG-EMSdatabase-331-master.servers.mongodirector.com", 
        //     user: 'app', 
        //     password: 'Cwaret155,', 
        //     database: 'EMS', 
        //     port: 3306
        // });

        sequelize.authenticate()
        .then(() => resolve(sequelize))
        .catch((err) => reject(`MySQL Connection Failed Error: ${err}`))

        // conn.connect(err => {
        //     if(err)
        //         reject('MySQL Connection Failed')
        //     else
        //         resolve('MySQL Connection Successful')
        // })
    })
}

module.exports = {
    connectMySQL,
}