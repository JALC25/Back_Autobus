const express = require('express');
const TransaccionController = require('../controllers/TransaccionController');

const router = express.Router();

router.get('/', TransaccionController.obtenerTransacciones);
router.get('/:id', TransaccionController.obtenerTransaccionPorId);
router.post('/', TransaccionController.crearTransaccion);
router.put('/:id', TransaccionController.actualizarTransaccion);
router.delete('/:id', TransaccionController.eliminarTransaccion);

module.exports = router;
