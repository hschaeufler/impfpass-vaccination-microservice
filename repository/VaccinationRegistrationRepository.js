const db = require("../utils/database");
var _ = require('lodash');

const pool = db.createPool();
const promisePool = pool.promise();


function mapResultToVaccinationRegistration(result){
    const vaccinationRegistration = {
        uuid : result.uuid,
        vaccine : result.vaccine,
        chargeNumber: result.chargeNumber,
        disease: result.disease,
        location: result.location,
        doctorsOffice: result.doctors_officename,
        doctorsId: result.doctors_uiserid,
        timestamp: result.timestamp
    }
    return vaccinationRegistration;
}


async function findByDoctorsId(userID) {
    const values = [userID];
    const vaccinationRegistrations = [];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            "SELECT uuid, vaccine, chargeNumber, disease, location, doctors_officename, doctors_uiserid, timestamp " +
            "FROM vaccinationregistration " +
            "WHERE doctors_userid like ?",values);

        if(results && results.length > 0){
            _.forEach(results,(result) => {
                const vaccinationRegistration = mapResultToVaccinationRegistration(result);
                vaccinationRegistrations.push(vaccinationRegistration);
            });
        }

        return vaccinationRegistrations;

    } finally {
        connection.release();
    }
}

async function findById(id) {
    const values = [id];
    let vaccinationRegistration = null;

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            "SELECT uuid, vaccine, chargeNumber, disease, location, doctors_officename, doctors_uiserid, timestamp " +
            "FROM vaccinationregistration " +
            "WHERE uuid like ?",values);

        if(results && results.length > 0){
              vaccinationRegistration  = mapResultToVaccinationRegistration(results[0]);
        }

        return vaccinationRegistration;

    } finally {
        connection.release();
    }
}


async function save(vaccinationRegistration) {
    const {uuid, vaccine, chargeNumber, disease, location, doctorsOffice, doctorsId,timestamp} = vaccinationRegistration;
    const values = [uuid, vaccine, chargeNumber, disease, location, doctorsOffice, doctorsId,timestamp];
    console.log(values);

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute("INSERT INTO vaccinationregistration " +
            "(uuid, vaccine, chargeNumber, disease, location, doctors_officename, doctors_userid, timestamp) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values);
        return rows.insertId;

    } finally {
        if(connection){
            connection.release();
        }
    }

}


module.exports = {findByDoctorsId, findById, save}