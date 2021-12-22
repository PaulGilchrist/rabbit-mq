// ex: node transaction-send.js information 'This is just an infomational message'
// ex: node transaction-send.js warning 'This is a warning message'
// ex: node transaction-send.js error 'This is an error message'
var amqp = require('amqplib/callback_api');

var exchange = 'transaction_logs';
var args = process.argv.slice(2);
var msg = args.slice(1).join(' ') || 'Hello World!';
var severity = (args.length > 0) ? args[0] : 'information';

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        // ToDo - Begin Transaction - channel.txSelect();
        let messageSent = channel.publish(exchange, severity, Buffer.from(msg));
        if (messageSent) {
            let sqlUpdated = true // ToDo - Add actual persistence update code - sql.update()
            if (sqlUpdated) {
                // ToDo - Complete Transaction - channel.txCommit();
                return success
            }
            console.log(` [x] Sent ${severity}: '${msg}'`);
        }
        // ToDo - Rollback Transaction - channel.txRollback();
    });
    setTimeout(() => {
        connection.close();
        process.exit(0)
    }, 500);
});
