// Used with https://github.com/PaulGilchrist/kubernetes-example for monitoring API changes
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        var queue = 'api';
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
        channel.consume(queue, (msg) => {
            console.log('');
            console.log(`Received ${msg.content.toString()}`);
        }, {
            noAck: true
        });
    });
});