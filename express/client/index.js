function start_clients() {
    const nc = require('./nats')
    nc.start().then(r => console.log(r));

    const sc = require('./stan')
    sc.start()
}

module.exports = start_clients