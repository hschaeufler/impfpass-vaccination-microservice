const db = require("../utils/database");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const pool = db.createPool();
const promisePool = pool.promise();

async function saveUser(user) {
    if(!(user && user.mail && user.password && user.name && user.role && user.officename && user.ort)){
        throw "Please check that all required fields of User are set";
    }

    const officename = user.officename ? user.officename : null;
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

    const VALUES = [user.mail,passwordHash,user.name ,user.role,officename,user.ort];

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute("INSERT INTO  user (mail, password, name, role, officename, ort) VALUES (?, ?, ?, ?, ?, ?)", VALUES);
        console.log(rows);
        console.log(fields);
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
        console.log(results);
        console.log("------------------------------------------------------------------------")
        console.log(fields);
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

async function getUser(mail) {

    const VALUES = [mail];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute("SELECT mail, name, role, officename, ort FROM  user WHERE mail = ?", VALUES);

        if(!results || results.length < 1){
            return null;
        }

        const user = {
            mail : results[0].mail,
            name: results[0].name,
            role: results[0].role,
            officename: results[0].officename,
            ort: results[0].ort
        }

        return user;

    } finally {
        connection.release();
    }

}



module.exports = {saveUser, checkUser,getUser}