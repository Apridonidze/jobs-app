const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',
    user : 'root',
    password : '$fc59A636a27CBo5=sZ27o=Mc]WG76B', 
    database : 'jobs_db'
})


module.exports = db