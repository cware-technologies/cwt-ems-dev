module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "EMS",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "EMS",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "EMS",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
