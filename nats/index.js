// requiring nats
const nats = require('nats')
const sc = require('nats').StringCodec()

// setting the servers
cluster = [
    {servers: 'nats://localhost:4222'}
];

async function connect() {
    try {
        const nc = await nats.connect(cluster);

        console.log(`connected to ${ nc.getServer() }`);

        return nc;
    } catch (err) {
        console.log(`error connecting to ${JSON.stringify(this.server)}`);
        console.error(err)

        return null;
    }
}

async function handler(sub) {
    for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }

    console.log("subscription closed");
}

async function test() {
    const nc = await connect()
    const sc = require('nats').StringCodec()

    if (nc === null) {
        console.error("Nats connection failed")

        return
    }

    const sub = nc.subscribe("hello");
    handler(sub).then(r => console.log(r))

    nc.publish("hello", sc.encode("world"));
    nc.publish("hello", sc.encode("again"));

    return "[OK] test";
}

// testing our method
test().then(r => console.log(r))
