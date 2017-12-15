import * as amqp from "amqplib/callback_api";

export class Amqp {
    public testRabbitMQ(): void {
        const msg = "Hello World";
        const second = {
            name: "test"
        };

        // // test promise api
        // amqp.connect("amqp://localhost")
        //   .then(connection => {
        //     return connection.createChannel()
        //       .tap(channel => channel.checkQueue("myQueue"))
        //       .then(channel => {
        //         console.log("###### send to queue");
        //         channel.sendToQueue("myQueue", new Buffer(msg));
        //       })
        //       .finally(() => connection.close());
        //   });

        // amqp.connect("amqp://localhost")
        //   .then(connection => {
        //     return connection.createChannel()
        //       .tap(channel => channel.checkQueue("myQueue"))
        //       .then(channel => {
        //         return channel.consume("myQueue", newMsg => {
        //           if (newMsg != undefined) {
        //             console.log("test");

        //             // test promise api properties
        //             if (newMsg.properties.contentType === "application/json") {
        //               console.log("New Message: " + newMsg.content.toString());
        //             }
        //           }
        //         });
        //       })
        //       .finally(() => connection.close());
        //   });

        amqp.connect("amqp://localhost", (err, connection) => {
            if (!err) {
                connection.createChannel((err, channel) => {
                    if (!err) {
                        channel.assertQueue("myQueue", {}, (err, ok) => {
                            if (!err) {
                                console.log("****************** send the message");
                                channel.sendToQueue("myQueue", new Buffer(JSON.stringify(second)));
                            }
                        });
                    }
                });
            }
        });

        let count = 0;
        amqp.connect("amqp://localhost", (err, connection) => {
            if (!err) {
                connection.createChannel((err, channel) => {
                    if (!err) {
                        channel.assertQueue("myQueue", {}, (err, ok) => {
                            if (!err) {
                                channel.consume("myQueue", newMsg => {
                                    if (newMsg != undefined) {
                                        if (++count % 2 == 0) {
                                            channel.ack(newMsg);
                                        }
                                        console.log("comsume new record " + count + ": " + JSON.parse(newMsg.content.toString()).name);
                                        //
                                        // test callback api properties
                                        if (newMsg.properties.contentType === "application/json") {
                                            console.log("New Message: " + newMsg.content.toString());
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        amqp.connect("amqp://localhost", (err, connection) => {
            if (!err) {
                connection.createChannel((err, channel) => {
                    if (!err) {
                        channel.assertQueue("myQueue", {}, (err, ok) => {
                            if (!err) {
                                channel.consume("myQueue", newMsg => {
                                    if (newMsg != undefined) {
                                        // channel.ack(newMsg);
                                        if (++count % 2 == 0) {
                                            channel.ack(newMsg);
                                        }
                                        console.log("comsume new record " + count + ": " + JSON.parse(newMsg.content.toString()).name);
                                        //
                                        // test callback api properties
                                        if (newMsg.properties.contentType === "application/json") {
                                            console.log("New Message: " + newMsg.content.toString());
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}