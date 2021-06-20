const express = require("express");
const router = express.Router();
const userService = require("../services/userservice");

router.get('/', async function(req, res, next) {
    try {
        const reqUser = req.user;
        const user = await userService.getUserByMail(reqUser.mail);
        res.json(user);
    } catch (exception) {
        next(exception);
    }

});

module.exports = router;
