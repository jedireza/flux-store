# flux-store

The missing store for vanilla Flux.


## Install

```js
$ npm install flux-store
```


## Usage

```js
var FluxStore = require('flux-store'); // that's us, such meta
var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');


var ActionTypes = Constants.ActionTypes;


var Store = FluxStore.extend({
    stateStuff: {
        loading: false,
        objectFoo: {},
        arrayOfBaz: []
    },
    getStateStuff: function () {

        return this.stateStuff;
    },
    onDispatcherAction: function (payload) {

        var action = payload.action;

        if (ActionTypes.SEND_REQUEST === action.type) {
            this.stateStuff.loading = true;
            this.emitChange();
        }

        if (ActionTypes.RECEIVE_RESPONSE === action.type) {
            this.stateStuff.loading = false;
            this.stateStuff.objectFoo = action.data.objectFoo;
            this.stateStuff.arrayOfBaz = action.data.arrayOfBaz;
            this.emitChange();
        }
    }
});


Store.registerDispatcher(Dispatcher);


module.exports = Store;
```


## A simple interface

#### `onDispatcherAction(payload)`

This is the handler for your `Dispatcher`'s action events.

#### `registerDispatcher(Dispatcher)`

This connects your `Store` to your `Dispatcher` and populates your `Store`'s
`dispatchToken` property so Flux stuff (like `waitFor`) continues to work.

#### `emitChange()`

This emits a `change` event so listeners know that state has changed.


## React change listeners

Two functions are included in your `Store` that you can use with your React
controller-views.

#### `addChangeListener(callback)`

You can use this in `ControllerView.componentDidMount` like:

```js
componentDidMount: function () {

    Store.addChangeListener(this.onStoreChange);
},
```

#### `removeChangeListener(callback)`

You can use this in `ControllerView.componentWillUnmount` like:

```js
componentWillUnmount: function () {

    Store.removeChangeListener(this.onStoreChange);
},
```


## License

MIT


## Don't forget

What you make with `flux-store` is more important than `flux-store`.
