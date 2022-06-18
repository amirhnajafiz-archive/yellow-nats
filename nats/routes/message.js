const express = require('express');
const router = express.Router();

const cli = require('../client');
const connection = cli.prototype.connect();


/* TODO: publish a message on nats */
router.post('/publish', function (_req, res, _next) {
    if (connection === null) {
        return res.status(503).send({
            message: "Initial server error"
        })
    }
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
