const env = require('dotenv');
env.config({ path: process.env.DB_CONFIG_PATH|| '../conf/db.env' });


const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    //get Injected as environment-Vars
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'vacbook',
    port: process.env.DB_PORT || 3306,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS || true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    queueLimit: process.env.DB_QUEUE_LIMIT ||  0
}

module.exports = DB_CONFIG;