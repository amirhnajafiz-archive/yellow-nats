// importing node nats streaming
const STAN = require('node-nats-streaming')

// cluster ID and client ID
const CLUSTER_ID = ""
const CLIENT_ID = ""

// opening a connection
const sc = STAN.connect(CLUSTER_ID, CLIENT_ID)

// after connection publish on a topic
sc.on('connect', () => {
    // Simple Publisher (all publishes are async in the node version of the client)
    sc.publish('foo', 'Hello node-nats-streaming!', (err, guid) => {
        if (err) {
            console.log('publish failed: ' + err)
        } else {
            console.log('published message with guid: ' + guid)
        }
    })
})

// Subscriber can specify how many existing messages to get.
const opts = sc.subscriptionOptions().setStartWithLastReceived()
const subscription = sc.subscribe('foo', opts)

subscription.on('message', (msg) => {
    console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData())
})

// closing connection
sc.on('close', () => {
    process.exit()
})
