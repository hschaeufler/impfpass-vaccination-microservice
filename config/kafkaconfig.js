const env = require('dotenv');
const {v4: uuidv4} = require('uuid');
env.config({ path: process.env.KAKFA_CONFIG_PATH || '../conf/kafka.env' });

const KAFKA_CONFIG = {
    kafkaBroker : process.env.KAFKA_BROKER || 'localhost:9092',
    clientId: "impfpass-app-" + uuidv4(),
    //get Injected as environment-Vars
    topics : {
        claimTopic: process.env.CLAIM_TOPIC || "CLAIM-TOPIC",
        registrationTopic: process.env.REGISTRATION_TOPIC || "REGISTRATION-TOPIC",
    }
}

module.exports = KAFKA_CONFIG;