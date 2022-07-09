function start_clients() {
    const cli = require('../client/nats')
    cli.start().then(r => console.log(r));
}

module.exports = start_clients