// BookCard.jsx
// Functional component to display individual book details

import React from "react";

const BookCard = ({ title, author, price, layout }) => {
    return (
        <div className={`book-card ${layout}`}>
            <h3 className="book-title">{title}</h3>
            <p className="book-author">by {author}</p>
            <p className="book-price">₹{price}</p>
        </div>
    );
};

export default BookCard;
