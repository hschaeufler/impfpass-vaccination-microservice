const express = require("express");
const router = express.Router();
const userservice = require("../services/userservice");

router.post('/', async function(req, res, next) {
    try {
        console.log('req.body', req.body);
        const user  = req.body;
        const result = await userservice.saveUser(user);
        res.json(result)
    } catch (exception) {
        console.log(exception);
        next(exception);
    }
});

module.exports = router;
