// requiring nats
const nats = require('nats');

// setting the nats servers information
cluster = [
    {servers: 'nats://localhost:4222'}
];

async function test() {
    // calling the nats connect method with
    // clusters information
    const nc = await nats.connect(cluster);
    
    // creating a jet-stream manager
    const jsm = await nc.jetstreamManager();
    await jsm.streams.add({name: "a", subjects: ["a.*"]});

    // create a jet-stream client:
    const js = nc.jetstream();

    // to publish messages to a stream:
    let pa = await js.publish("a.b");
    
    // the jet-stream returns an acknowledgement with the
    // stream that captured the message, it's assigned sequence
    // and whether the message is a duplicate.
    const stream = pa.stream;
    const seq = pa.seq;
    const duplicate = pa.duplicate;

    // More interesting is the ability to prevent duplicates
    // on messages that are stored in the server. If
    // you assign a message ID, the server will keep looking
    // for the same ID for a configured amount of time, and
    // reject messages that sport the same ID:
    await js.publish("a.b", nats.Empty, {msgID: "a"});

    // you can also specify constraints that should be satisfied.
    // For example, you can request the message to have as its
    // last sequence before accepting the new message:
    await js.publish("a.b", nats.Empty, {expect: {lastMsgID: "a"}});
    await js.publish("a.b", nats.Empty, {expect: {lastSequence: 3}});
    // save the last sequence for this publish
    pa = await js.publish("a.b", nats.Empty, {expect: {streamName: "a"}});
    
    // if additional "a.b" has been recorded, this will fail
    await js.publish("a.b", nats.Empty, {expect: {lastSubjectSequence: pa.seq}});
}

test();
