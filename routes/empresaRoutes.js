const express = require('express');
const EmpresaController = require('../controllers/empresaController');

const router = express.Router();

router.get('/', EmpresaController.getEmpresas);
router.get('/:id', EmpresaController.getEmpresaById);
router.post('/', EmpresaController.createEmpresa);
router.put('/:id', EmpresaController.updateEmpresa);
router.delete('/:id', EmpresaController.deleteEmpresa);

module.exports = router;
