const db = require("../utils/database");
const bcrypt = require("bcrypt");


const SALT_ROUNDS = 10;
const pool = db.createPool();
const promisePool = pool.promise();

async function saveUser(user) {

    const officeName = user.officeName ? user.officeName : null;
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

    const VALUES = [user.mail,passwordHash,user.lastName, user.firstName ,user.role,officeName,user.location];

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute("INSERT INTO  user (mail, password, lastname, firstname, role, officename, location) VALUES (?, ?, ?, ?, ?, ?, ?)", VALUES);

        return rows.insertId;
    } finally {
        if(connection){
            connection.release();
        }
    }
}

async function checkUser(mail, password) {

    const VALUES = [mail];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute("SELECT password FROM  user WHERE mail = ?", VALUES);

        if(!results || results.length < 1){
            throw "User is unknown!";
        }

        const passwordHash = results[0].password;

        const match = await bcrypt.compare(password, passwordHash);

        return match;

    } finally {
        connection.release();
    }

}

function mapResultToUser(result) {
    const user = {
        userid: result.userid,
        mail : result.mail,
        lastName: result.lastname,
        firstName: result.firstname,
        role: result.role,
        officeName: result.officename,
        location: result.location,
    }
    return user;
}

async function getUserByMail(mail) {

    const VALUES = [mail];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute("SELECT userid, mail, lastname, firstname, role, officename, location FROM  user WHERE mail = ?", VALUES);

        if(!results || results.length < 1){
            return null;
        }

        const user = mapResultToUser(results[0]);

        return user;

    } finally {
        connection.release();
    }

}



module.exports = {saveUser, checkUser,getUserByMail}