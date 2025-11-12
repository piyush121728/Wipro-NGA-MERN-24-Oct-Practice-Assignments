import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import SearchBox from "./SearchBox";
import RenderMessage from "./RenderMessage";
import withLoader from "./withLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import { storeInstance } from '../flux/di';
import { Link } from 'react-router-dom';

const BookList = ({ loading, setLoading }) => {
    const [books, setBooks] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef(null);

    useEffect(() => {
        // initialize from current store contents
        setBooks(storeInstance.getBooks());
        // subscribe to store changes
        const onChange = () => setBooks(storeInstance.getBooks());
        storeInstance.addChangeListener(onChange);

        // fetch initial data from backend (and populate store)
        setLoading(true);
        fetch("http://localhost:8000/books")
            .then((res) => res.json())
            .then((data) => {
                // dispatch INIT via direct store injection for simplicity
                // we don't import actions here to avoid circular deps; use store directly
                if (Array.isArray(data)) {
                    // mutate store by dispatching INIT through its dispatcher
                    // storeInstance will be updated through Store API; but simplest is to call storeInstance._books = data; storeInstance.emitChange();
                    storeInstance._books = data.slice().reverse(); // latest first
                    storeInstance.emitChange();
                }
                setLoading(false);
            }).catch((err) => {
                console.error('Error fetching books', err);
                setLoading(false);
            });

        return () => {
            storeInstance.removeChangeListener(onChange);
        };
    }, [setLoading]);

    const toggleLayout = () => setLayout((l) => (l === "grid" ? "list" : "grid"));
    const focusSearch = () => searchRef.current && searchRef.current.focus();

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h2 className="mt-4">Featured Books</h2>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} inputRef={searchRef} />
            <div className="d-flex gap-2 mb-3">
                <Link to="/add-book" className="btn btn-success me-2">Add New Book</Link>
                <button className="btn btn-primary" onClick={toggleLayout}>
                    Switch to {layout === "grid" ? "List" : "Grid"} View
                </button>
                <button className="btn btn-secondary ms-2" onClick={focusSearch}>Focus Search</button>
            </div>


            {filteredBooks.length === 0 && (
                <RenderMessage render={() => "No books found. Try a different search!"} />
            )}

            <div className={`book-list ${layout === "grid" ? "grid" : "list"}`}>
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        layout={layout}
                    />
                ))}
            </div>
        </div>
    );
};

export default withLoader(BookList);
