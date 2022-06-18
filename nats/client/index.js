const nats = require('nats')

class Client {
    constructor() {
        this.servers = [
            { servers: ['nats://127.0.0.1:4222'] }
        ];
    }

    connect() {
        this.servers.forEach(async(v) => {
            try {
                const nc = await nats.connect(v);

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

module.exports = new Client();
