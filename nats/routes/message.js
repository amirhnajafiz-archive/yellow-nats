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

/* TODO: subscribe on a message */
router.get('/subscribe', function (_req, res, _next) {
    if (connection === null) {
        return res.status(503).send({
            message: "Initial server error"
        })
    }
})

module.exports = router;
