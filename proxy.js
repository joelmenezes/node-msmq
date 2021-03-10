import edge from 'edge-js';
import path from 'path';

const baseOptions = {
	assemblyFile: path.join(__dirname, 'MSMQLib.dll'),
	typeName: 'MSMQLib.MSMQInterface',
};

function getMethod(methodName) {
	return edge.func(Object.assign({}, baseOptions, { methodName }));
}

export var queueProxy = {
	exists: getMethod('ExistsQueue'),
	create: getMethod('CreateQueue'),
	send: getMethod('SendMessage'),
	receive: getMethod('ReceiveMessages'),
	peek: getMethod('Peek'),
	remove: getMethod('ReceiveMessageById'),
	list: getMethod('GetAllMessages'),
	clear: getMethod('PurgeQueue'),
	connectRemote: getMethod('ConnectRemote')
};
