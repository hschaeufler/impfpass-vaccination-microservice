const mysql = require('mysql2');

function getConnection(){
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'vacbook'
    });
    return connection;
}

function createPool(){
    // create the connection to database
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'vacbook',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

module.exports = {getConnection, createPool}
