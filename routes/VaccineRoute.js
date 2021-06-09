const express = require("express");
const router = express.Router();
const vaccineService = require("../services/VaccineService");

router.get('/', async function(req, res, next) {
    try {
        const vaccines  = await vaccineService.getList();
        res.json(vaccines);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
