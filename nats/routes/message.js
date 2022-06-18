const express = require('express');
const router = express.Router();

const cli = require('../client');
const connection = cli.prototype.connect();

import { StringCodec } from "nats";
const sc = StringCodec();



router.post('/publish', function (req, res, _next) {
    if (connection === null) {
        return res.status(503).send({
            message: "Initial server error"
        })
    }

    connection.publish(req.body['message'], sc.encode(req.body['topic']))
})


router.ws('/subscribe', function (ws, req) {
    if (connection === null) {
        ws.send('[Error] Nats connection')
    }

    const sub = connection.subscribe(req.body['topic']);

    (async () => {
        for await (const m of sub) {
            ws.send(m.data)
        }
    })();
})

module.exports = router;
