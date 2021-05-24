// ex: node emit_log_direct.js information 'This is just an infomational message'
// ex: node emit_log_direct.js warning 'This is a warning message'
// ex: node emit_log_direct.js error 'This is an error message'
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    var exchange = 'direct_logs';
    var args = process.argv.slice(2);
    var msg = args.slice(1).join(' ') || 'Hello World!';
    var severity = (args.length > 0) ? args[0] : 'information';
    channel.assertExchange(exchange, 'direct', {
      durable: false
    });
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", severity, msg);
  });
  setTimeout(() => {
    connection.close();
    process.exit(0)
  }, 500);
});