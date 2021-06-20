const express = require("express");
const router = express.Router();
const vaccinationService = require("../services/VaccinationService");const {UserRole} = require("../model/Enum");

router.post('/registration', async function(req, res, next) {
    try {
        const authUser = req.user;
        const vaccinationRegistrationRequest  = req.body;

        //todo: Entsprechende HTTP-Methode setzen
        if(!authUser || authUser.role !== UserRole.doctor || !authUser.officeName || !authUser.userid){
            throw "User is not allowed to call Method!";
        }

        vaccinationRegistrationRequest.doctorsOffice = authUser.officeName;
        vaccinationRegistrationRequest.doctorsId = authUser.userid;
        vaccinationRegistrationRequest.location = authUser.location ? authUser.location : "UNKNOWN";

        const vaccinationRegistration  = await vaccinationService.reportVaccinationRegistration(vaccinationRegistrationRequest);

        res.json(vaccinationRegistration);
    } catch (exception) {
        next(exception);
    }

});


router.post('/claim', async function(req, res, next) {
    try {
        const authUser = req.user;
        const vaccinationClaim  = req.body;

        //todo: Entsprechende HTTP-Methode setzen
        if(!authUser || authUser.role !== UserRole.user || !authUser.userid){
            throw "User is not allowed to call Method!";
        }

        vaccinationClaim.vaccinatedperson = authUser.firstName +" " + authUser.lastName;
        vaccinationClaim.userid = authUser.userid;

        const vaccinationRegistration  = await vaccinationService.reportVaccinationClaim(vaccinationClaim);

        res.json(vaccinationRegistration);
    } catch (exception) {
        next(exception);
    }

});

router.get('/', async function(req, res, next) {
    try {
        const authUser = req.user;

        //todo: Entsprechende HTTP-Methode setzen
        if(!authUser || !authUser.role || !authUser.userid){
            throw "Your user is not correct!";
        }

        const userId = authUser.userid;
        let vaccinations = null;

        if(authUser.role === UserRole.doctor){
            vaccinations = await vaccinationService.getByDoctorsId(userId);
        } else {
            vaccinations = await vaccinationService.getByUserId(userId);
        }

        res.json(vaccinations);
    } catch (exception) {
        next(exception);
    }

});

router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const vaccination  = await vaccinationService.getByVaccinationID(id);
        res.json(vaccination);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
