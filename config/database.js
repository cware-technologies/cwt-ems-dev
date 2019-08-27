const mysql = require('mysql');
const Sequelize = require('sequelize');

let user = process.env.MYSQL_USERNAME || "root"
let password = process.env.MYSQL_PASSWORD || "cwaret155,"

function connectMySQL() {
    return new Promise((resolve, reject) => {
        const sequelize = new Sequelize('EMS', user, password, {
            host: 'localhost',
            dialect: 'mysql',
            define: {
                //prevent sequelize from pluralizing table names
                freezeTableName: true
            },
            logging: false
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