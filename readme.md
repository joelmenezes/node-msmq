# updated-node-msmq

This is a fork of [node-msmq](https://github.com/marcobarcelos/node-msmq) providing improvements and additional functionality which are not yet added into the main node-msmq repo.

NPM package is published as updated-node-msmq. https://www.npmjs.com/package/updated-node-msmq.

> A MSMQ implementation for node.js

## Differences from `node-msmq`

* Support for Node.Js 6.x, 7.x, 8.x, 9.x, 10.x
* Support to push objects to the queue instead of just strings.
* Support to send/receive messages to/from a queue on a **remote** machine.

## Install

```
$ npm install --save updated-node-msmq
```

## Usage (Local Queue)

### Send a message

Sends a message to a MSMQ queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Send message to queue
queue.send('Hello from Node.JS!');
```

### Receive messages

Start receiving messages from a queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Set receive listener callback
queue.on('receive', (msg) => {
  console.log(msg.body);
});

// Start receiving messages from the queue
queue.startReceiving();
```

### Peek messages

Start listeng for messages without removing them until you are ready to do so. Callbacks for the 'peek' event receive an object containing two properties:

* `msg` The MSMQ Message.
* `next()` Pops the message from the queue and start peeking for the next one.

```js
queue.on('peek', (event) => {
  console.log(event.msg.body);

  // Do some logic that might fail.
  if (Math.random() > 0.5) {
    throw Error('number is too high!');
  }

  // Remove the message from the queue and peek for next message.
  event.next();
})

queue.startPeeking();
```

### Peek

Promised based method to peek for a message in the queue without removing it. Resolves to a MSMQMessage.

```js
queue.peek().then(msg => console.log(msg.body));

//or

let msg = await queue.peek();
```

### Remove

Promise based method to remove a message with given id from the queue. Resolves to `true` if message was removed and `false` if message didn't exist in the queue.

```js
queue.remove('12345')
     .then(status => console.log(status ? 'Message was removed'
                                        : 'Message was not in queue'));

//or

let status = await queue.remove('12345');
```

### Get all messages

Gets all messages without removing them from queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');
var messages = queue.getAllMessages();
```

### Purge a queue

Clears all messages from the queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');
queue.purge();
```

## Usage (Remote Queue)

### Send a message to a remote queue

Sends a message to a remote MSMQ queue.

```js
const msmq = require('updated-node-msmq');

// Send message to a remote queue using hostname
let queue1 = msmq.connectToRemoteQueue('FormatName:DIRECT=OS:mobile-000000\\private$\\privatetest');

queue1.send('Hello again from Node.JS!');

// Send message to a remote queue using IP address
let queue2 = msmq.connectToRemoteQueue('FormatName:DIRECT=TCP:192.168.5.21\\private$\\privatetest');

queue2.send('Hello again from Node.JS!');


```

### Receive messages from a remote queue

Start receiving messages from a remote queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.connectToRemoteQueue('FormatName:DIRECT=OS:mobile-000000\\private$\\privatetest');

// Set receive listener callback
queue.on('receive', (msg) => {
  console.log(msg.body);
});

// Start receiving messages from the queue
queue.startReceiving();
```

### Get all messages

Gets all messages without removing them from a remote queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.connectToRemoteQueue('.\\Private$\\MyAwesomeQueue');
var messages = queue.getAllMessages();
```

#### Note:
* Creating a queue / Checking if a queue exists on a remote machine is currently not supported by MSMQ.
* To communicate with a remote queue, MSMQ should be enabled in the sender's machine too. Also, in the _Security_ tab of the queue on the remote machine should have the appropriate permissions set for _Everyone_ and _ANONYMOUS LOGON_.
* The queue should already be created on the remote machine.
* The format to connect to a remote queue is as follows:
`
msmsq.connectToRemoteQueue(path);
`
* `path` has to be in the following format:

    `FormatName:DIRECT=TCP:`_`<ip_address>`_`\\private$\\`_`<queue_name>`_`

    or

    `FormatName:DIRECT=OS:`_`<machine_name>`_`\\private$\\`_`<queue_name>`_`


## License

MIT © [Joel Menezes](https://joelmenezes.github.io/)
