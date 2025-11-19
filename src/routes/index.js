//extrait router de express
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth');

//crée le routeur
const router = Router();

//montage des sous routes
//route produits /monapi/products
router.use('/products', require('./products.routes'));
router.use('/books',authMiddleware ,require('./books.routes'));
router.use('/auth', require('./auth.routes'));

//exporte le routeur
module.exports = router;