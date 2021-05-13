const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userService = require("../services/userservice");
const {TOKEN_SECRET} = require("../utils/jwtutil");
//const jwt = require('jsonwebtoken');

const localLoginStrategy = new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'password'
    },
    async function(username, password, done) {
        try {
            if(!username || !password) {
                return done(null, false, { message: 'Please submit Username and Password' });
            }

            const user = await userService.getUser(username);

            if (!user) {
                console.log("user is unknown");
                return done(null, false, { message: 'User is unknown' });
            }

            const stringPassword = String(password);
            const isAuth = await userService.checkUser(username,stringPassword);

            if(!isAuth){
                console.log("Password not valid!");
                return done(null, false, { message: 'Password not valid!' });
            }

            return done(null, user);
        } catch (exception){
            return done(exception);
        }
    }
);

const JWT_OPTIONS = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : TOKEN_SECRET
}

const JWTStrategy = new JwtStrategy(JWT_OPTIONS, async function(jwt_payload, done) {
    console.log(jwt_payload);

    const user = jwt_payload;

    const userFromDB = await userService.getUser(user.mail);

    if(!userFromDB){
            console.log("user is unknown");
            return done(null, false, { message: 'User is unknown' });
    }

    return done(null,user);

});

module.exports = {localLoginStrategy, JWTStrategy};