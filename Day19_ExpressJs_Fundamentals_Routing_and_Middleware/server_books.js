const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
    { id: 1, title: "1984", author: "Orwell" },
    { id: 2, title: "The Alchemist", author: "Coelho" }
];
let nextId = 3; // to assign new ids

// GET /books -> list all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books -> add a new book (basic validation)
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'title and author are required' });
    }
    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id -> update book
app.put('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, author } = req.body;
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

    const updated = { ...books[bookIndex], title: title ?? books[bookIndex].title, author: author ?? books[bookIndex].author };
    books[bookIndex] = updated;
    res.json(updated);
});

// DELETE /books/:id -> delete book
app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLen = books.length;
    books = books.filter(b => b.id !== id);
    if (books.length === initialLen) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
