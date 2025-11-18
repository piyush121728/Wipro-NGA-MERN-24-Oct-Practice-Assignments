const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: "1984", author: "Orwell" },
    { id: 2, title: "The Alchemist", author: "Coelho" }
];
let nextId = 3;

// expose a function to get books array if needed by server
router.get('/', (req, res) => res.json(books));

router.post('/', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Book not found' });
    const { title, author } = req.body;
    books[idx] = { ...books[idx], title: title ?? books[idx].title, author: author ?? books[idx].author };
    res.json(books[idx]);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const before = books.length;
    books = books.filter(b => b.id !== id);
    if (books.length === before) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
});

module.exports = router;
