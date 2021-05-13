const jwt = require('jsonwebtoken');

const TOKEN_SECRET = "TOKENSECRET_TODO_AUSLAGERN";

//see: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
function generateToken(value){
    return jwt.sign(value, TOKEN_SECRET,  { expiresIn: '1800s' });
}

module.exports = {generateToken, TOKEN_SECRET};