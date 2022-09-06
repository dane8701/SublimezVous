const express = require('express');
const router = express.Router();

const avisCtrl = require('../controllers/avis');

router.post('/', avisCtrl.createAvis);

router.put('/:id', avisCtrl.modifyAvis);

router.delete('/:id', avisCtrl.deleteAvis);

router.get('/:id', avisCtrl.getOneAvis);

router.get('/', avisCtrl.getAllAviss);

module.exports = router;