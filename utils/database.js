const mysql = require('mysql2');

function getConnection(){
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'impfpassdb-service',
        user: 'root',
        password: 'root',
        database: 'vacbook',
        port: 3306
    });
    return connection;
}

function createPool(){
    // create the connection to database
    const pool = mysql.createPool({
        host: 'impfpassdb-service',
        user: 'root',
        password: 'root',
        database: 'vacbook',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

module.exports = {getConnection, createPool}
