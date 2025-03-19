const express = require('express');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getClienteById);
router.post('/', ClienteController.createCliente);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

module.exports = router;
