const mysql = require('mysql2/promise');

async function createConnection(){
    // create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'vacbook'
    });
    return connection;
}

module.exports = {}
