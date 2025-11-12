// Store.js - Flux store implementation with dependency injection
import { Actions } from './actions';

export default class Store {
    constructor({ dispatcher, apiBase = 'http://localhost:8000' } = {}) {
        if (!dispatcher) throw new Error('Dispatcher instance required');
        this._dispatcher = dispatcher;
        this._books = [];
        this._listeners = [];
        this._dispatchToken = this._dispatcher.register(this._onDispatch.bind(this));
        this.apiBase = apiBase;
    }

    _onDispatch(action) {
        switch (action.type) {
            case Actions.INIT_BOOKS:
                this._books = Array.isArray(action.payload) ? action.payload : [];
                this.emitChange();
                break;
            case Actions.ADD_BOOK:
                // optimistic update could be added
                break;
            case Actions.ADD_BOOK_SUCCESS:
                this._books = [action.payload, ...this._books];
                this.emitChange();
                break;
            case Actions.ADD_BOOK_FAIL:
                // could set error state
                break;
            default:
                break;
        }
    }

    getBooks() {
        return this._books.slice();
    }

    addChangeListener(cb) {
        if (typeof cb === 'function') this._listeners.push(cb);
    }

    removeChangeListener(cb) {
        this._listeners = this._listeners.filter(l => l !== cb);
    }

    emitChange() {
        this._listeners.forEach((l) => {
            try { l(); } catch (e) { console.error(e); }
        });
    }
}
