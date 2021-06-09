const db = require("../utils/database");
const bcrypt = require("bcrypt");
const {UserRole} = require("../model/Enum");

const SALT_ROUNDS = 10;
const pool = db.createPool();
const promisePool = pool.promise();

async function saveUser(user) {
    if(!(user && user.mail && user.password && user.firstName && user.lastName && user.location)){
        throw "Please check that all required fields of User are set";
    }

    if(user.isDoctor && !user.officeName){
        throw "Please submit an Officename if you are a Doctor!";
    }

    const officename = user.officeName ? user.officeName : null;
    const role = user.isDoctor ? UserRole.doctor : UserRole.user;
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

    const VALUES = [user.mail,passwordHash,user.lastName, user.firstName ,role,officename,user.location];

    console.log(VALUES)

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute("INSERT INTO  user (mail, password, lastname, firstname, role, officename, location) VALUES (?, ?, ?, ?, ?, ?, ?)", VALUES);
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
        const [results, fields] = await connection.execute("SELECT userid, mail, lastname, firstname, role, officename, location FROM  user WHERE mail = ?", VALUES);

        if(!results || results.length < 1){
            return null;
        }

        const user = {
            userid: results[0].userid,
            mail : results[0].mail,
            lastname: results[0].lastname,
            firstname: results[0].firstname,
            role: results[0].role,
            officename: results[0].officename,
            location: results[0].location,
        }

        return user;

    } finally {
        connection.release();
    }

}



module.exports = {saveUser, checkUser,getUser}