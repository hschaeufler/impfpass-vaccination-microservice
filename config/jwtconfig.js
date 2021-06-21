const {v4: uuidv4} = require('uuid');

module.exports = {
    TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || uuidv4()
};