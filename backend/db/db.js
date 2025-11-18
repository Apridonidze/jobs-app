const mysql = require('mysql2/promise'); //importing express library
require('dotenv').config();  //importing dotenv

const db = mysql.createPool({
    host: process.env.DB_HOST , //database host name
    user : process.env.DB_USER, //database user name
    password : process.env.DB_PASSWORD,  //database user's password
    database : process.env.DB_DATABASE //database's target database name
});

module.exports = db ; //exporting middleware