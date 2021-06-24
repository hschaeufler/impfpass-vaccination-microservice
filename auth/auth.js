const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {TOKEN_SECRET} = require("../utils/jwtutil");
const {UserRole} = require("../model/Enum");


const JWT_OPTIONS = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : TOKEN_SECRET
}

function validateUser(user){
    return user
        && user.userid
        && user.mail
        && user.firstName
        && user.lastName
        && user.location
        && ((user.role === UserRole.doctor && user.officeName) || user.role === UserRole.user)
}

const JWTStrategy = new JwtStrategy(JWT_OPTIONS, async function(jwt_payload, done) {

    const user = jwt_payload;

    if(!validateUser(user)){
            console.log("user is unknown");
            return done(null, false, { message: 'User is unknown' });
    }

    return done(null,user);

});

module.exports = {JWTStrategy};