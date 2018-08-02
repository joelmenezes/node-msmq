# updated-node-msmq

This is a fork of [node-msmq](https://github.com/marcobarcelos/node-msmq) providing improvements and additional functionality which are not yet added into the main node-msmq repo.

NPM package is published as updated-node-msmq. https://www.npmjs.com/package/updated-node-msmq.

> A MSMQ implementation for node.js

## Differences from `node-msmq`

* Support for Node.Js 6.x, 7.x, 8.x, 9.x, 10.x
* Support to push objects to the queue instead of just strings. 
* Support to send messages to a queue on a **remote** machine.

## Install

```
$ npm install --save updated-node-msmq
```

## Usage

### Send a message

Sends a message to a MSMQ queue.

```js
const msmq = require('updated-node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Send message to queue
queue.send('Hello from Node.JS!');
```

### Send a message to a remote queue

Sends a message to a remote MSMQ queue.

```js
const msmq = require('updated-node-msmq');

// Send message to a remote queue using hostname
msmq.sendToRemoteQueue('FormatName:DIRECT=OS:mobile-000000\\private$\\privatetest', 'Hello from Node.JS!');

msmq.sendToRemoteQueue('FormatName:DIRECT=TCP:192.168.1.5\\private$\\privatetest', 'Hello again from Node.JS!');
```

#### Note: 
* Creating a queue on a remote machine is not currently supported by MSMQ.
* To send messages to a remote queue, MSMQ should be enabled in the sender's machine too. Also, in the _Security_ tab of the queue on the remote machine should have the appropriate permissions set for _Everyone_ and _ANONYMOUS LOGON_.
* The queue should already be created on the remote machine.
* The format to send a message to a remote queue is as follows:
`
msmsq.sendToRemoteQueue(path, message);
`
* `path` has to be in the following format:

    `FormatName:DIRECT=TCP:`_`<ip_address>`_`\\private$\\`_`<queue_name>`_`

    or

    `FormatName:DIRECT=OS:`_`<machine_name>`_`\\private$\\`_`<queue_name>`_`

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

## License

MIT © [Joel Menezes](https://joelmenezes.github.io/)
