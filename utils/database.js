const mysql = require('mysql2');
const dbConfig = require('../config/dbconfig');

function createPool(){
    // create the connection to database
    const pool = mysql.createPool(dbConfig);
    return pool;
}

module.exports = {createPool}
