const mysql = require('mysql2');
const dbConfig = require('../config/dbconfig');
const {DateTime} = require("luxon");

function createPool(){
    // create the connection to database
    const pool = mysql.createPool(dbConfig);
    return pool;
}

function toDateString(date){
    return DateTime.fromJSDate(date).toFormat("yyyy-LL-dd HH:mm:ss.SSS");
}

module.exports = {createPool,toDateString}
