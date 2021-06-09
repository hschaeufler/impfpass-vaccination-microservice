const vaccinationRegistrationRepository = require("../repository/VaccinationRegistrationRepository");
const { v4: uuidv4 } = require('uuid');

function validate(vaccinationRegistration){
    return vaccinationRegistration.vaccine
        && vaccinationRegistration.disease
        && vaccinationRegistration.chargeNumber
        && vaccinationRegistration.location
        && vaccinationRegistration.doctorsOffice
        && vaccinationRegistration.doctorsId;
}


async function create(vaccinationRegistration){
    console.log(vaccinationRegistration);
    const isValid = validate(vaccinationRegistration);
    if(!isValid){
        throw "Vaccination-Registration is not Valid! Please fill all fields!";
    }

    vaccinationRegistration.uuid = uuidv4();
    vaccinationRegistration.timestamp = new Date();

    await vaccinationRegistrationRepository.save(vaccinationRegistration);

    return vaccinationRegistration;
}

async function getById(id){
    if(!id){
        throw "Please submit a valid id!";
    }

    const vaccinationRegistration = await vaccinationRegistrationRepository.findById(id);
    return vaccinationRegistration;
}


module.exports = {create,getById}