const { Kafka } = require('kafkajs');
const KAFKA_CONFIG = require("../config/kafkaconfig");

// Please have a look at https://kafka.js.org/docs/getting-started for further Details

const topics = KAFKA_CONFIG.topics;

//Create Connection To the Kafka Message-Broker
const kafka = new Kafka({
    clientId: KAFKA_CONFIG.clientId,
    brokers: [KAFKA_CONFIG.kafkaBroker]
});

const producer = kafka.producer()

async function sendMessage(topicName, messageObj){
    try {
        await producer.connect()
        const kafkaMessage = {
            topic: topicName,
            messages: [
                {value : JSON.stringify(messageObj)}
            ],
        };
        await producer.send(kafkaMessage);
        console.log(kafkaMessage);
    } finally {
        await producer.disconnect()
    }
}





module.exports = {sendMessage, topics}