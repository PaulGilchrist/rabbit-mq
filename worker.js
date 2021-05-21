// Used with new_task.js to demonstrate a simple queue Work Queue for distributing time-consuming tasks among multiple workers
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        var queue = 'task_queue';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(() => {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});