// requiring nats
const nats = require('nats')
const sc = require('nats').StringCodec()

// setting the nats servers information
cluster = [
    {servers: 'nats://localhost:4222'}
];

// connect to nats server
async function connect() {
    try {
        // calling the nats connect method with
        // clusters information
        const nc = await nats.connect(cluster);

        // get the connected servers
        console.log(`connected to ${ nc.getServer() }`);

        return nc;
    } catch (err) {
        // if an error occurs during the nats connecting
        console.error(`error connecting to ${JSON.stringify(this.server)}`);
        console.error(err)

        return null;
    }
}

// subscribe handler for getting the messages
async function handler(sub) {
    for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }

    console.log("subscription closed");
}

// trying to test our nats server
async function test() {
    // first we connect to nats server
    const nc = await connect()

    if (nc === null) {
        console.error("Nats connection failed")

        return
    }

    // subscribing on a topic
    const sub = nc.subscribe("hello");

    // setting the handler
    handler(sub).then(r => console.log(r))

    // publish on that topic
    nc.publish("hello", sc.encode("world"));
    nc.publish("hello", sc.encode("again"));
}

// begin testing
test().then(r => console.log(r))
