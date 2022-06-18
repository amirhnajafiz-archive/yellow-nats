const express = require('express');
const router = express.Router();

/* TODO: publish a message on nats */
router.post('/publish', function (_req, res, _next) {
    res.json(
        {
            'message': 'OK'
        }
    );
})

/* TODO: subscribe on a message */
router.get('/subscribe', function (_req, res, _next) {

})

module.exports = router;
