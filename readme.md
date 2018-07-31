# updated-node-msmq

This is a fork of [node-msmq](https://github.com/marcobarcelos/node-msmq) providing improvements and additional functionality which are not yet added into the main node-msmq repo.

NPM package is published as updated-node-msmq. https://www.npmjs.com/package/updated-node-msmq.

> A MSMQ implementation for node.js

## Differences from `node-msmq`

* Support for Node.Js 6.x, 7.x, 8.x, 9.x, 10.x
* Support to push objects to the queue instead of just strings. 

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
