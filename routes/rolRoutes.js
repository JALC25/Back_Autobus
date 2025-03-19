const express = require('express');
const RolController = require('../controllers/rolController');

const router = express.Router();

router.get('/', RolController.getRoles);
router.get('/:id', RolController.getRolById);
router.post('/', RolController.createRol);
router.put('/:id', RolController.updateRol);
router.delete('/:id', RolController.deleteRol);

module.exports = router;
