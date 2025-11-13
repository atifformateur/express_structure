const { Router } = require('express');
const booksController = require('../controllers/books.controller');

const router = Router();

//Définir les endpoints
router.get('/', booksController.listBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createdBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;