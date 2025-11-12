// Dispatcher.js - Simple Flux dispatcher
export default class Dispatcher {
    constructor() {
        this._callbacks = {};
        this._lastId = 1;
    }

    register(callback) {
        const id = 'ID_' + this._lastId++;
        this._callbacks[id] = callback;
        return id;
    }

    unregister(id) {
        delete this._callbacks[id];
    }

    dispatch(action) {
        Object.values(this._callbacks).forEach((cb) => cb(action));
    }
}
