const mqtt = require('mqtt');
const host = 'io.adafruit.com';
const connectUrl = `mqtt://${host}`;

const topicSensor = 'minhcao2000/feeds/sensor';
const topicLed = 'minhcao2000/feeds/bbc-led';
const topicBuzzer = 'minhcao2000/feeds/bbc-alarm';

var ledData = "0";
var buzzerData = "0";

function adafruit(app) {
    const client = mqtt.connect(connectUrl, {
        clean: true,
        port: 1883,
        connectTimeout: 4000,
        username: 'minhcao2000',
        password: 'aio_Moyy32mrhzeCzgerxNr8kjaslPAM',
        reconnectPeriod: 1000,
    })
    
    client.on('connect', () => {
        console.log("Successfully connected to adafruit");
        client.subscribe([topicSensor], () => {
            console.log(`Subscribe to all topic`)
        });
    });
    
    client.on('message', (topic, message) => {
        console.log('Received Message:', topic, parseInt(message));
        if(!parseInt(message)){
            ledData = "1";
            buzzerData = "1";
        }
        else {
            ledData = "0";
            buzzerData = "0";
        }
        
        
        client.publish(topicLed, ledData, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
            console.log('Send Message: ',ledData, topicLed);
        });
        client.publish(topicBuzzer, buzzerData, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
            console.log('Send Message: ',buzzerData, topicBuzzer);
        });
        
        app.get('/',(req, res) =>{
            ledData = ledData;
            buzzerData = buzzerData;
            res.send({
                ledData,
                buzzerData,
            });
        })
    });

    
}

module.exports = adafruit;