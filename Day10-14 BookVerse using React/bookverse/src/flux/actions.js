// actions.js - Action creators for BookVerse
import apiClient from '../utils/apiClient';

const Actions = {
    INIT_BOOKS: 'INIT_BOOKS',
    ADD_BOOK: 'ADD_BOOK',
    ADD_BOOK_SUCCESS: 'ADD_BOOK_SUCCESS',
    ADD_BOOK_FAIL: 'ADD_BOOK_FAIL',
    // other actions could be listed here
};

const addBook = async (dispatcher, bookData) => {
    dispatcher.dispatch({ type: Actions.ADD_BOOK, payload: bookData });
    try {
        const created = await apiClient.post('/books', bookData);
        dispatcher.dispatch({ type: Actions.ADD_BOOK_SUCCESS, payload: created });
        return created;
    } catch (err) {
        dispatcher.dispatch({ type: Actions.ADD_BOOK_FAIL, payload: { error: err } });
        throw err;
    }
};

const initBooks = (dispatcher, books) => {
    dispatcher.dispatch({ type: Actions.INIT_BOOKS, payload: books });
};

export { Actions, addBook, initBooks };
