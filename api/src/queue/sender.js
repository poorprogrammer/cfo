const amqp = require("amqplib/callback_api");

module.exports = class Sender {
  static connection;

  static create() {
    if (!Sender.connection) Sender.connect();
    if (Sender.connection) {
      return new Sender();
    }
    return new MockSender();
  }

  send(queue, msg) {
    try {
      Sender.createChannel(queue).then((channel) => {
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
      });
    } catch (e) {
      console.log(e);
    }
  }

  static connect() {
    amqp.connect("amqp://cfo:password@localhost", function (e, connection) {
      if (e) {
        console.log("cannot connect to queue server %s", e.toString());
      }
      Sender.connection = connection;
    });
  }

  static createChannel(queue) {
    return new Promise((resolve, reject) => {
      if (Sender.channel) return resolve(Sender.channel);
      Sender.connection.createChannel(function (e, channel) {
        if (e) {
          console.log("cannot create channel to queue server %s", e.toString());
          return reject(e);
        }
        Sender.channel = channel;
        Sender.channel.assertQueue(queue, {
          durable: false,
        });
        return resolve(Sender.channel);
      });
    });
  }
};

class MockSender {
  send(queue, msg) {}
}
