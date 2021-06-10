const vaccinationRepository = require("../repository/VaccinationRepository");
const { v4: uuidv4 } = require('uuid');

function validateVaccination(vaccination){
    return vaccination.registrationId
        && vaccination.vaccinatedperson
        && vaccination.userid;
}

function validateVaccinationRegistration(vaccinationRegistration){
    return vaccinationRegistration.vaccine
        && vaccinationRegistration.disease
        && vaccinationRegistration.chargeNumber
        && vaccinationRegistration.location
        && vaccinationRegistration.doctorsOffice
        && vaccinationRegistration.doctorsId;
}

async function reportVaccinationRegistration(vaccinationRegistration){
    console.log(vaccinationRegistration);
    const isValid = validateVaccinationRegistration(vaccinationRegistration);
    if(!isValid){
        throw "Vaccination-Registration is not Valid! Please fill all fields!";
    }

    vaccinationRegistration.uuid = uuidv4();
    vaccinationRegistration.timestamp = new Date();

    //TODO: Call Kafka

    return vaccinationRegistration;
}

async function reportVaccinationClaim(vaccination){
    const isValid = validateVaccination(vaccination);
    if(!isValid){
        throw "Vaccination is not Valid! Please fill all fields!";
    }

    vaccination.uuid = uuidv4();
    vaccination.timestamp = new Date();

    //TODO: Call Kafka

    return vaccination;

}

async function getByVaccinationID(id){
    if(!id){
        throw "Please submit a valid id!";
    }

    const vaccination = await vaccinationRepository.findByVaccinationId(id);
    return vaccination;
}

async function getByDoctorsId(doctorsId){
    if(!doctorsId){
        throw "Please submit a valid id!";
    }

    const vaccination = await vaccinationRepository.findByDoctorsId(doctorsId);
    return vaccination;
}

async function getByUserId(userId){
    if(!userId){
        throw "Please submit a valid UserId!";
    }

    const vaccination = await vaccinationRepository.findByUserId(userId);
    return vaccination;
}

module.exports = {reportVaccinationClaim,reportVaccinationRegistration,getByVaccinationID, getByDoctorsId, getByUserId}