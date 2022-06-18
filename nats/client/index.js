const nats = require('nats')
const e = require("express");

class Client {
    constructor() {
        this.server = [{servers: 'nats://localhost:4222'}]
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
}

module.exports = new Client();
