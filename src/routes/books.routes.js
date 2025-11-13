const { Router } = require('express');
const booksController = require('../controllers/books.controller');

const router = Router();

//Définir les endpoints
router.get('/', booksController.listBooks);
router.post('/', booksController.createdBook);
router.put('/:id', booksController.updateBook);

module.exports = router;