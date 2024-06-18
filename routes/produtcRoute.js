const { crearProducto, leerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productController');

const router = require('express').Router();

router.post('/', crearProducto);
router.get('/:id', leerProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
