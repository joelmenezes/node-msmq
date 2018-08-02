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
