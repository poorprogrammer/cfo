const amqp = require("amqplib/callback_api");

module.exports = class Sender {
  constructor(connection) {
    this.connection = connection;
  }

  static create(queue) {
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        console.log("cannot connect to queue server %s", error0.toString());
        return new MockSender();
      }
      return Sender(connection);
    });
  }

  send(queue, msg) {
    this.connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(
          "cannot create channel to queue server %s",
          error1.toString()
        );
        return;
      }
      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  }
};

class MockSender {
  send(queue, msg) {}
}
