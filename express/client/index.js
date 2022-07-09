function start_clients() {
    const cli = require('./nats')
    cli.start().then(r => console.log(r));
}

module.exports = start_clients