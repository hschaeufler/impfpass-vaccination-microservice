const express = require("express");
const router = express.Router();
const vaccinationRegistrationService = require("../services/VaccinationRegistrationService");
const {UserRole} = require("../model/Enum");

router.post('/', async function(req, res, next) {
    try {
        const authUser = req.user;
        const vaccinationRegistrationRequest  = req.body;

        //todo: Entsprechende HTTP-Methode setzen
        if(!authUser || authUser.role !== UserRole.doctor || !authUser.officename || !authUser.userid){
            throw "User is not allowed to call Method!";
        }

        vaccinationRegistrationRequest.doctorsOffice = authUser.officename;
        vaccinationRegistrationRequest.doctorsId = authUser.userid;
        vaccinationRegistrationRequest.location = authUser.location ? authUser.location : "UNKNOWN";

        const vaccinationRegistration  = await vaccinationRegistrationService.create(vaccinationRegistrationRequest);
        res.json(vaccinationRegistration);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
