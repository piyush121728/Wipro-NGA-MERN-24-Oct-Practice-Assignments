// BookCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BookCard = ({ id, title, author, price, layout }) => {
    const navigate = useNavigate();

    // Navigate to book details page
    const handleCardClick = () => navigate(`/book/${id}`);

    // Navigate to author info page (stop card click)
    const handleAuthorClick = (e) => {
        e.stopPropagation(); // prevent card navigation
        navigate(`/author/${encodeURIComponent(author)}`);
    };

    return (
        <div
            className={`book-card card mb-3 ${layout === "grid" ? "p-3" : "p-2"}`}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
        >
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p
                    className="card-text text-muted"
                    onClick={handleAuthorClick}
                    style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
                >
                    by {author}
                </p>
                <p className="card-text">₹{price}</p>
            </div>
        </div>
    );
};

BookCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    layout: PropTypes.string.isRequired,
};

export default BookCard;
