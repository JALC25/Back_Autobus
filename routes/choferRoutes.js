const express = require('express');
const ChoferController = require('../controllers/choferController');

const router = express.Router();

router.get('/', ChoferController.getChoferes);
router.get('/:id', ChoferController.getChoferById);
router.post('/', ChoferController.createChofer);
router.put('/:id', ChoferController.updateChofer);
router.delete('/:id', ChoferController.deleteChofer);

module.exports = router;
