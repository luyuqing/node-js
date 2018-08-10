
const EventEmitter = require('events');
// emitter = new EventEmitter();

// // register event listener
// emitter.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// });

// // raise an event
// emitter.emit('messageLogged', {info: 'yuqing message'});

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', {infoArg: 'yuqing message test emitter'});
    };
};

module.exports = Logger;