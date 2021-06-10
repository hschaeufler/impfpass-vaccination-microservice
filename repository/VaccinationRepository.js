const db = require("../utils/database");
var _ = require('lodash');

const pool = db.createPool();
const promisePool = pool.promise();

/*    const vaccinationRegistration = {
        uuid : result.uuid,
        vaccine : result.vaccine,
        chargeNumber: result.chargeNumber,
        disease: result.disease,
        location: result.location,
        doctorsOffice: result.doctors_officename,
        doctorsId: result.doctors_uiserid,
        timestamp: result.timestamp
    }*/

function mapResultToVaccination(result) {
    const vaccination = {
        uuid: result.uuid,
        vaccine: result.vaccine,
        chargeNumber: result.chargeNumber,
        disease: result.disease,
        location: result.location,
        timestamp: result.timestamp,
        doctorsOffice: result.doctors_officename,
        registrationId: result.registration_uuid,
        doctorsId: result.doctors_uiserid,
        vaccinatedperson: result.vaccinatedperson_name,
        userid: result.vaccinatedperson_userid,
        registrationTimestamp: result.registration_timestap
    }
    return vaccination;
}

const SELECT_VACCINATION_SQL_PART = "SELECT uuid, " +
    "vaccine, " +
    "chargeNumber, " +
    "disease, " +
    "location, " +
    "timestamp, " +
    "doctors_officename, " +
    "registration_uuid, " +
    "doctors_uiserid, " +
    "vaccinatedperson_name, " +
    "vaccinatedperson_userid, " +
    "registration_timestap " +
    "FROM vaccination ";

async function findByDoctorsId(userID) {
    const values = [userID];
    const vaccinations = [];

    const connection = await promisePool.getConnection();
    try {
        const SQL_QUERY = SELECT_VACCINATION_SQL_PART + "WHERE doctors_uiserid like ?";

        const [results, fields] = await connection.execute(SQL_QUERY, values);

        if (results && results.length > 0) {
            _.forEach(results, (result) => {
                const vaccination = mapResultToVaccination(result);
                vaccinations.push(vaccination);
            });
        }

        return vaccinations;

    } finally {
        connection.release();
    }
}


async function findByUserId(userID) {
    const values = [userID];
    const vaccinations = [];

    const connection = await promisePool.getConnection();
    try {
        const SQL_QUERY = SELECT_VACCINATION_SQL_PART + "WHERE vaccinatedperson_userid like ?";

        const [results, fields] = await connection.execute(SQL_QUERY, values);

        if (results && results.length > 0) {
            _.forEach(results, (result) => {
                const vaccination = mapResultToVaccination(result);
                vaccinations.push(vaccination);
            });
        }

        return vaccinations;

    } finally {
        connection.release();
    }
}

async function findByVaccinationId(id) {
    const values = [id];
    let vaccination = null;

    const SQL_QUERY = SELECT_VACCINATION_SQL_PART + "WHERE uuid like ?";

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(
            SQL_QUERY, values);

        if (results && results.length > 0) {
            vaccination = mapResultToVaccination(results[0]);
        }

        return vaccination;

    } finally {
        connection.release();
    }
}

async function findByRegistrationId(registrationId) {
    const values = [registrationId];
    let vaccination = null;

    const SQL_QUERY = SELECT_VACCINATION_SQL_PART + "WHERE vaccinationregistration_uuid like ?";

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute(SQL_QUERY, registrationId);

        if (results && results.length > 0) {
            vaccination = mapResultToVaccination(results[0]);
        }

        return vaccination;

    } finally {
        connection.release();
    }
}

async function save(vaccination) {
    const {uuid, registrationId, vaccinatedperson, userid, timestamp} = vaccination;
    const values = [uuid, registrationId, vaccinatedperson, userid, timestamp];

    const INSERT_SQL = "INSERT INTO vaccination " +
        "(uuid, " +
        "vaccine, " +
        "chargeNumber, " +
        "disease, " +
        "location, " +
        "timestamp, " +
        "doctors_officename, " +
        "registration_uuid, " +
        "doctors_uiserid, " +
        "vaccinatedperson_name, " +
        "vaccinatedperson_userid, " +
        "registration_timestap) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    const connection = await promisePool.getConnection();
    try {
        const [rows, fields] = await connection.execute(INSERT_SQL, values);
        return rows.insertId;

    } finally {
        if (connection) {
            connection.release();
        }
    }

}




module.exports = {findByDoctorsId, findByUserId, findByVaccinationId, findByRegistrationId, save}