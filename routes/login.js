const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwtutil = require("../utils/jwtutil");

router.post('/', passport.authenticate("login", { session: false }),async function(req, res, next) {
    const token = jwtutil.generateToken(req.user);
    res.send(token);
});

module.exports = router;
