var Lab = require('lab');
var Code = require('code');
var Store = require('../index');


var lab = exports.lab = Lab.script();


lab.experiment('Store', function () {

    lab.test('it is an object with an extend method', function (done) {

        Code.expect(Store).to.be.an.object();
        Code.expect(Store.extend).to.be.a.function();

        done();
    });


    lab.test('it creates a new store by extending the base store', function (done) {

        var MyStore = Store.extend({});

        Code.expect(MyStore).to.be.an.object();
        Code.expect(MyStore.registerDispatcher).to.be.a.function();
        Code.expect(MyStore.emitChange).to.be.a.function();
        Code.expect(MyStore.addChangeListener).to.be.a.function();
        Code.expect(MyStore.removeChangeListener).to.be.a.function();

        done();
    });


    lab.test('it registers a dispatcher when passed in extend options', function (done) {

        var MockDispatcher = {
            register: function () {

                done();
            }
        };

        Store.extend({
            dispatcher: MockDispatcher,
            onDispatcherAction: function () { }
        });
    });


    lab.test('it registers a dispatcher manually', function (done) {

        var MockDispatcher = {
            register: function () {

                done();
            }
        };

        var MyStore = Store.extend({
            onDispatcherAction: function () { }
        });

        MyStore.registerDispatcher(MockDispatcher);
    });


    lab.test('it demonstrates add/remove listener and emit change', function (done) {

        var MockDispatcher = {
            callbacks: [],
            register: function (callback) {

                this.callbacks.push(callback);
                return 'id';
            },
            handleAction: function (type, data) {

                this.callbacks.forEach(function (callback) {

                    callback({
                        action: {
                            type: type,
                            data: data
                        }
                    });
                });
            }
        };

        var MyStore = Store.extend({
            dispatcher: MockDispatcher,
            onDispatcherAction: function (payload) {

                this.emitChange();
            }
        });

        var changeListener = function () {

            MyStore.removeChangeListener(changeListener);
            done();
        };

        MyStore.addChangeListener(changeListener);
        MockDispatcher.handleAction('ACTION_TYPE', 'DATA');
    });
});
