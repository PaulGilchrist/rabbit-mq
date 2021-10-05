// Used with emit-log.js to demonstrate the publish/subscribe pattern
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        var exchange = 'logs';
        channel.assertExchange(exchange, 'fanout', { // Could change to direct and add a binding key
            durable: false
        });
        channel.assertQueue('', {
            exclusive: true
        }, (error2, q) => {
            if (error2) {
                throw error2;
            }
            console.log(` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, (msg) => {
                if (msg.content) {
                    console.log(` [x] ${msg.content.toString()}`);
                }
            }, {
                noAck: true
            });
        });
    });
});