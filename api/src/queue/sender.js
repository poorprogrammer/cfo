const amqp = require("amqplib/callback_api");
const config = require("config");

module.exports = class Sender {
  static connection;
  static channel = {};

  static create() {
    if (!Sender.connection) Sender.connect();
    if (Sender.connection) {
      return new Sender();
    }
    return new MockSender();
  }

  send(queue, msg) {
    Sender.createChannel(queue)
      .then((channel) => {
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
      })
      .catch((e) => console.log(e));
  }

  static connect() {
    amqp.connect(config.get("QUEUE_SERVER"), function (e, connection) {
      if (e) {
        console.log("cannot connect to queue server %s", e.toString());
      }
      Sender.connection = connection;
    });
  }

  static createChannel(queue) {
    return new Promise((resolve, reject) => {
      if (Sender.channel[queue]) return resolve(Sender.channel[queue]);
      Sender.connection.createChannel(function (e, channel) {
        if (e) {
          console.log("cannot create channel to queue server %s", e.toString());
          return reject(e);
        }
        Sender.channel[queue] = channel;
        return resolve(Sender.channel[queue]);
      });
    });
  }
};

class MockSender {
  send(queue, msg) {
    // do nothing when there is no queue system to connect
  }
}
