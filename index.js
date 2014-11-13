var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');


var CHANGE_EVENT = 'change';


var FluxStore = ObjectAssign({}, EventEmitter.prototype, {
    dispatchToken: undefined,
    registerDispatcher: function (Dispatcher) {

        this.dispatchToken = Dispatcher.register(this.onDispatcherAction);
    },
    emitChange: function () {

        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {

        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {

        this.removeListener(CHANGE_EVENT, callback);
    },
    extend: function (stuff) {

        return ObjectAssign({}, FluxStore, stuff);
    }
});


module.exports = FluxStore;
