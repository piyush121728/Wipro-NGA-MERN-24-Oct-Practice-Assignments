const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

let books = [
  { id: 1, title: "1984", author: "Orwell" },
  { id: 2, title: "The Alchemist", author: "Coelho" }
];

let nextId = 3;

// GET ALL BOOKS 
router.get('/', (req, res) => {
  res.json(books);
});

//  GET ONE BOOK BY ID  
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

//  ADD A NEW BOOK  
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author } = req.body;
    const newBook = { id: nextId++, title, author };

    books.push(newBook);
    res.status(201).json(newBook);
  }
);

//  UPDATE A BOOK  
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty')
  ],
  (req, res) => {
    const id = Number(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author } = req.body;
    const updatedBook = {
      ...books[bookIndex],
      title: title ?? books[bookIndex].title,
      author: author ?? books[bookIndex].author
    };

    books[bookIndex] = updatedBook;

    res.json(updatedBook);
  }
);

//  DELETE A BOOK  
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = books.length;

  books = books.filter(b => b.id !== id);

  if (books.length === initialLength) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json({ message: 'Book deleted' });
});

module.exports = router;
