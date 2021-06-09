const express = require("express");
const router = express.Router();
const vaccinationService = require("../services/VaccinationService");

router.post('/', async function(req, res, next) {
    try {
        const vaccinationRequest  = req.body;
        const vaccination  = await vaccinationService.create(vaccinationRequest);
        res.json(vaccination);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
