const express = require("express");
const passport = require('passport');
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const {localLoginStrategy,JWTStrategy} = require("./auth/auth");


//app Septup
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use("login", localLoginStrategy);
passport.use("jwt", JWTStrategy);

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", passport.authenticate("jwt", { session: false }), userRoute);

app.listen(port, ()=> {
    console.log(`Vac-Book-Backend listening at http://localhost:${port}`);
})