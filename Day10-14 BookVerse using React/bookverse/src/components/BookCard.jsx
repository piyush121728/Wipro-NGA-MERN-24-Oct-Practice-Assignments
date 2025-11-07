// BookCard.jsx
// Functional component with PropTypes and click event for author details

import React from "react";
import PropTypes from "prop-types";

const BookCard = ({ title, author, price, layout, onSelectAuthor }) => {
    return (
        <div
            className={`book-card card mb-3 ${layout === "grid" ? "p-3" : "p-2"}`}
            onClick={() => onSelectAuthor(author)}
            style={{ cursor: "pointer" }}
        >
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-muted">by {author}</p>
                <p className="card-text">₹{price}</p>
            </div>
        </div>
    );
};

// PropTypes validation
BookCard.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    layout: PropTypes.string.isRequired,
    onSelectAuthor: PropTypes.func.isRequired,
};

export default BookCard;
