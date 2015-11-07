'use strict';

const Lab = require('lab');
const Code = require('code');
const Store = require('../index');


const lab = exports.lab = Lab.script();


lab.experiment('Store', () => {

    lab.test('it is an object with an extend method', (done) => {

        Code.expect(Store).to.be.an.object();
        Code.expect(Store.extend).to.be.a.function();

        done();
    });


    lab.test('it creates a new store by extending the base store', (done) => {

        const MyStore = Store.extend({});

        Code.expect(MyStore).to.be.an.object();
        Code.expect(MyStore.registerDispatcher).to.be.a.function();
        Code.expect(MyStore.emitChange).to.be.a.function();
        Code.expect(MyStore.addChangeListener).to.be.a.function();
        Code.expect(MyStore.removeChangeListener).to.be.a.function();

        done();
    });


    lab.test('it registers a dispatcher when passed in extend options', (done) => {

        const MockDispatcher = {
            register: () => {

                done();
            }
        };

        Store.extend({
            dispatcher: MockDispatcher,
            onDispatcherAction: () => {}
        });
    });


    lab.test('it registers a dispatcher manually', (done) => {

        const MockDispatcher = {
            register: () => {

                done();
            }
        };

        const MyStore = Store.extend({
            onDispatcherAction: () => {}
        });

        MyStore.registerDispatcher(MockDispatcher);
    });


    lab.test('it demonstrates add/remove listener and emit change', (done) => {

        const MockDispatcher = {
            callbacks: [],
            register: function (callback) {

                this.callbacks.push(callback);
                return 'id';
            },
            handleAction: function (type, data) {

                this.callbacks.forEach((callback) => {

                    callback({
                        action: {
                            type: type,
                            data: data
                        }
                    });
                });
            }
        };

        const MyStore = Store.extend({
            dispatcher: MockDispatcher,
            onDispatcherAction: function (payload) {

                this.emitChange();
            }
        });

        const changeListener = () => {

            MyStore.removeChangeListener(changeListener);
            done();
        };

        MyStore.addChangeListener(changeListener);
        MockDispatcher.handleAction('ACTION_TYPE', 'DATA');
    });
});
