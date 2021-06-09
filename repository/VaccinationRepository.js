const db = require("../utils/database");
var _ = require('lodash');

const pool = db.createPool();
const promisePool = pool.promise();


function mapResultToVaccination(result){
    const vaccination = {
        uuid : result.uuid,
        registrationId : result.vaccinationregistration_uuid,
        vaccinatedperson : result.vaccinatedperson_mame,
        userid: result.vaccinatedperson_userid,
        timestamp: result.timestamp
    }
    return vaccination;
}


async function findByUserId(userID) {
    const values = [userID];
    const vaccinations = [];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            "SELECT uuid, " +
            "vaccinationregistration_uuid, " +
            "vaccinatedperson_mame, " +
            "vaccinatedperson_userid, " +
            "timestamp " +
            "FROM vaccination " +
            "WHERE vaccinatedperson_userid like ?",values);

        if(results && results.length > 0){
            _.forEach(results,(result) => {
                const vaccination = mapResultToVaccination(result);
                vaccinations.push(vaccination);
            });
        }

        return vaccinations;

    } finally {
        connection.release();
    }
}

async function findById(id) {
    const values = [id];
    let vaccination = null;

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            "SELECT uuid, " +
            "vaccinationregistration_uuid, " +
            "vaccinatedperson_mame, " +
            "vaccinatedperson_userid, " +
            "timestamp " +
            "FROM vaccination " +
            "WHERE uuid like ?",values);

        if(results && results.length > 0){
             vaccination = mapResultToVaccination(results[0]);
        }

        return vaccinations;

    } finally {
        connection.release();
    }
}

async function findByRegistrationId(registrationId) {
    const values = [registrationId];
    let vaccination = null;

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            "SELECT uuid, " +
            "vaccinationregistration_uuid, " +
            "vaccinatedperson_mame, " +
            "vaccinatedperson_userid, " +
            "timestamp " +
            "FROM vaccination " +
            "WHERE vaccinationregistration_uuid like ?",registrationId);

        if(results && results.length > 0){
              vaccination = mapResultToVaccination(results[0]);
        }

        return vaccination;

    } finally {
        connection.release();
    }
}

async function save(vaccination) {
    const {uuid, registrationId, vaccinatedperson, userid, timestamp} = {vaccines};
    const values = [uuid, registrationId, vaccinatedperson, userid, timestamp];

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute("INSERT INTO vaccination (uuid, vaccinationregistration_uuid, vaccinatedperson_name, vaccinatedperson_userid, timestap) VALUES (?, ?, ?, ?, ?)", values);
        return rows.insertId;

    } finally {
        if(connection){
            connection.release();
        }
    }

}



module.exports = {findByUserId, findById, findByRegistrationId, save}