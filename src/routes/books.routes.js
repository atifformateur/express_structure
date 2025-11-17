const { Router } = require('express');
const booksController = require('../controllers/books.controller');
const uploadBookImage = require('../middlewares/uploadBookImage');

const router = Router();

//Définir les endpoints
router.get('/', booksController.listBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createdBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);
//une route spécial pour l'upload d'image book
router.post('/:id/cover',uploadBookImage.single('cover'), booksController.uploadCover);


module.exports = router;