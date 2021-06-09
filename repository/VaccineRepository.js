const db = require("../utils/database");
var _ = require('lodash');

const pool = db.createPool();
const promisePool = pool.promise();

function mapResultToVaccine(result) {
    const  vaccine = {
        vacid : result.vacid,
        name: result.name,
        disease: result.disease,
        authorizationHolder: result.authorizationHolder,
        approvalNumber: result.approvalNumber,
        type: result.type
    }
    return vaccine;
}

async function findByName(name) {
    const values = [name];
    let vaccine = null;

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute("SELECT vacid, name, disease, authorizationHolder, approvalNumber, type FROM  vaccine WHERE name like ?",values);

        if(results && results.length > 0){
            vaccine = mapResultToVaccine(results[0]);
        }

        return vaccine;

    } finally {
        connection.release();
    }
}

async function findAll() {
    let vaccines = [];

    const connection = await promisePool.getConnection();
    try {
        const [results, fields] = await connection.execute("SELECT vacid, name, disease, authorizationHolder, approvalNumber, type FROM  vaccine");

        if(results && results.length > 0){
            _.forEach(results,(result) => {
                const vaccine = mapResultToVaccine(result);
                vaccines.push(vaccine);
            });
        }

    return vaccines;

    } finally {
        connection.release();
    }

}



module.exports = {findAll, findByName}