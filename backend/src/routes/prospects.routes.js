const express = require('express');
const router = express.Router();
const prospectsController = require('../controllers/prospects.controller');

router.get('/', prospectsController.getAllProspects);
router.post('/', prospectsController.createProspect);
router.get('/:id', prospectsController.getProspectById);
router.put('/:id', prospectsController.updateProspect);
router.delete('/:id', prospectsController.deleteProspect);

module.exports = router;
