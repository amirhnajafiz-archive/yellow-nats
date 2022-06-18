import { connect } from "nats";

class Client {
    constructor() {
        this.servers = [
            {},
            { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
            { servers: "demo.nats.io:4443" },
            { port: 4222 },
            { servers: "localhost" },
        ];
    }

    connect() {
        this.servers.forEach(async(v) => {
            try {
                const nc = await connect(v);

                console.log(`connected to ${nc.getServer()}`);

                return nc;
            } catch (err) {
                console.log(`error connecting to ${JSON.stringify(v)}`);

                return null;
            }
        });

        return null;
    }
}

module.exports = Client;
