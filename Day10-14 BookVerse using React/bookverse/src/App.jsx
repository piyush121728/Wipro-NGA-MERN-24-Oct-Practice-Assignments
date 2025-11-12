// App.jsx - updated to include Day 4 routes (Add/Edit)
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AuthorInfo from './components/AuthorInfo';
import BookForm from './components/BookForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App bg-light p-4 fade-in">
        <header className="bg-dark text-white p-3 rounded mb-4">
          <h1>📚 BookVerse</h1>
          <p>Explore books and learn about authors!</p>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<BookList loading={loading} setLoading={setLoading} />} />
          <Route path="/book/:id" element={<BookDetails loading={loading} setLoading={setLoading} />} />
          <Route path="/author/:authorName" element={<AuthorInfo />} />
          <Route path="/add-book" element={<BookForm mode="add" />} />
          <Route path="/edit/:id" element={<BookForm mode="edit" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
