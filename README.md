# Yellow NATS

<p align="center">
  <img src=".github/readme/logo.jpeg" width="191" alt="logo" />
</p>

Examples of connecting to **NATS** server via _javascript_ client.

This repository is created for connecting to different kind of nats servers (nats, stan, jet-stream, ...) with
a javascript client. Both front-end and back-end clients are implemented to connect to a nats server and do the basic functionalities like publish
and subscribe.

## Content
- Connect to a nats server and subscribe on a topic
  - Publish on a nats server 
  - Connection handling

### connect to nats
```js
const nats = require('nats');

// setting the nats servers information
cluster = [
    {servers: 'nats://localhost:4222'}
];

const nc = await nats.connect(cluster);
```

### publish
```js
nc.publish(topic, sc.encode(msg));
```

### subscribe
```js
// subscribing on a topic
const sub = nc.subscribe(topic);

// subscribe handler for getting the messages
async function handler(sub) {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }

  console.log("subscription closed");
}
```

- Connect to a stan server and subscribe on a topic
  - Publish on a stan server
  - Subscribe on more than one topic

### publish over stan
```js
// Simple Publisher (all publishes are async in the node version of the client)
sc.publish(topic, 'Hello node-nats-streaming!', (err, guid) => {
    if (err) {
        console.log('publish failed: ' + err);
    } else {
        console.log('published message with guid: ' + guid);
    }
})
```

### subscribe over stan
```js
// Subscriber can specify how many existing messages to get
const opts = sc.subscriptionOptions().setStartWithLastReceived();
const subscription = sc.subscribe(topic, opts);

// handler
subscription.on('message', (msg) => {
    console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData());
});
```

- Connect to a jet-stream server and subscribe on a topic
  - Manage a stream
  - Publish on topic
  - Subscribe for events

### manage streams
```js
// creating a jet-stream manager
const jsm = await nc.jetstreamManager();

// list all the streams, the `next()` function
// retrieves a paged result.
const streams = await jsm.streams.list().next();
streams.forEach((si) => {
    console.log(si);
});
```

### publish over jet-stream
```js
nc.publish(`${subj}.a`, nats.Empty);
```

### subscribe over jet-stream
```js
// To get multiple messages in one request you can:
let msg = await js.fetch(stream, name, { batch: 10, expires: 5000 });

// the request returns an iterator that will get at most 10 messages or wait
// for 5000ms for messages to arrive.
const done = (async () => {
    for await (const m of msg) {
        // do something with the message
        // and if the consumer is not set to auto-ack, ack!
        m.ack();
    }
})();
```
