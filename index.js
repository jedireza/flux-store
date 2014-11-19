var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');


var CHANGE_EVENT = 'change';


var FluxStore = ObjectAssign({}, EventEmitter.prototype, {
    dispatchToken: undefined,
    registerDispatcher: function (Dispatcher) {

        var callback = this.onDispatcherAction.bind(this);
        this.dispatchToken = Dispatcher.register(callback);
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

        var newStore = ObjectAssign({}, FluxStore, stuff);

        if (stuff.dispatcher) {
            newStore.registerDispatcher(stuff.dispatcher);
        }

        delete newStore.extend;
        return newStore;
    }
});


module.exports = FluxStore;
