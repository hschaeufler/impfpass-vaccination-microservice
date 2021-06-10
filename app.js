const express = require("express");
const passport = require('passport');
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const vaccineRoute = require("./routes/VaccineRoute");
const vaccinationRoute = require("./routes/VaccinationRoute");
const {port} = require("./config");
const {localLoginStrategy, JWTStrategy} = require("./auth/auth");


//app Septup
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

passport.use("login", localLoginStrategy);
passport.use("jwt", JWTStrategy);

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", passport.authenticate("jwt", {session: false}), userRoute);
app.use("/api/vaccine", passport.authenticate("jwt", {session: false}), vaccineRoute);
app.use("/api/vaccination", passport.authenticate("jwt", {session: false}), vaccinationRoute);

app.listen(port, () => {
    console.log(`Vac-Book-Backend listening at http://localhost:${port}`);
})