const nats = require('nats')

class Client {
    constructor() {
        this.server = [
            {servers: 'express://localhost:4222'}
        ];
    }

    async connect() {
        try {
            const nc = await nats.connect(this.server);

            console.log(`connected to ${ nc.getServer() }`);

            return nc;
        } catch (err) {
            console.log(`error connecting to ${JSON.stringify(this.server)}`);
            console.error(err)

            return null;
        }
    }

    async start() {
        const nc = await this.connect()
        const sc = require('nats').StringCodec()

        const sub = nc.subscribe("hello");
        (async () => {
            for await (const m of sub) {
                console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
            }
            console.log("subscription closed");
        })().then(r => console.log(r));

        nc.publish("hello", sc.encode("world"));
        nc.publish("hello", sc.encode("again"));

        return "[OK] test";
    }
}

module.exports = new Client();
