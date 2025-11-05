//extrait router de express
const { Router } = require('express');

//crée le routeur
const router = Router();

//montage des sous routes
//route produits /monapi/products
router.use('/products', require('./products.routes'));

//exporte le routeur
module.exports = router;



