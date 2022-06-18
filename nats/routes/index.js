const express = require('express');
const router = express.Router();

const nc = require('../client').connect()
const sc = require('nats').StringCodec()

const sub = nc.subscribe("hello");
(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
  console.log("subscription closed");
})();

nc.publish("hello", sc.encode("world"));
nc.publish("hello", sc.encode("again"));

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
