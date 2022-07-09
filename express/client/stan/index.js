const st = require('node-nats-streaming')
const e = require("express");

class Client {
    constructor() {
        this.cluster = "";
        this.client = "";
    }

    connect() {
        try {
            const sc = st.connect(this.cluster, this.client);

            console.log(`connect to ${ sc.eventNames() }`);

            return sc;
        } catch (err) {
            console.log(`error connection to ${ this.cluster }`);
            console.error(err);

            return null;
        }
    }
}

sc.on('connect', () => {
    // Simple Publisher (all publishes are async in the node version of the client)
    sc.publish('foo', 'Hello node-nats-streaming!', (err, guid) => {
        if (err) {
            console.log('publish failed: ' + err)
        } else {
            console.log('published message with guid: ' + guid)
        }
    })

    // Subscriber can specify how many existing messages to get.
    const opts = sc.subscriptionOptions().setStartWithLastReceived()
    const subscription = sc.subscribe('foo', opts)
    subscription.on('message', (msg) => {
        console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData())
    })

    // After one second, unsubscribe, when that is done, close the connection
    setTimeout(() => {
        subscription.unsubscribe()
        subscription.on('unsubscribed', () => {
            sc.close()
        })
    }, 1000)
})

sc.on('close', () => {
    console.log("[STAN] Connection closed")
})
