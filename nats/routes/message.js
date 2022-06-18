const express = require('express');
const router = express.Router();
const cli = require('../client');

/* TODO: publish a message on nats */
router.post('/publish', function (_req, res, _next) {
    cli.prototype.connect();

    res.json(
        {
            'message': 'OK'
        }
    );

    cli.prototype.disconnect();
})

/* TODO: subscribe on a message */
router.get('/subscribe', function (_req, res, _next) {
    cli.prototype.connect();
    cli.prototype.disconnect();
})

module.exports = router;
