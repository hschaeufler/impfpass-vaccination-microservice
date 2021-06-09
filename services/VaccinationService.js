const vaccinationRepository = require("../repository/VaccinationRepository");
const { v4: uuidv4 } = require('uuid');

function validate(vaccination){
    return vaccination.registrationId
        && vaccination.vaccinatedperson
        && vaccination.userid;
}

async function create(vaccination){
    const isValid = validate(vaccination);
    if(!isValid){
        throw "Vaccination is not Valid! Please fill all fields!";
    }

    vaccination.uuid = uuidv4();
    vaccination.timestamp = new Date();

    await vaccinationRepository.save(vaccination);

    return vaccination;

}

async function getById(id){
    if(!id){
        throw "Please submit a valid id!";
    }

    const vaccination = await vaccinationRepository.findById(id);
    return vaccination;
}

module.exports = {create,getById}