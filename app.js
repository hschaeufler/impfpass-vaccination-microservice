const express = require("express");
const passport = require('passport');
const vaccineRoute = require("./routes/VaccineRoute");
const vaccinationRoute = require("./routes/VaccinationRoute");
const {port} = require("./config");
const {JWTStrategy} = require("./auth/auth");


//app Septup
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());


passport.use("jwt", JWTStrategy);

app.use("/vaccinationapi/vaccine", passport.authenticate("jwt", {session: false}), vaccineRoute);
app.use("/vaccinationapi/vaccination", passport.authenticate("jwt", {session: false}), vaccinationRoute);

app.listen(port, () => {
    console.log(`Vac-Book-Backend listening at http://localhost:${port}`);
})