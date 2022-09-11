const express = require('express');
const router = express.Router();

const prestationCtrl = require('../controllers/prestation');

router.post('/', prestationCtrl.createPrestation);

router.put('/', prestationCtrl.modifyPrestation);

router.delete('/:id', prestationCtrl.deletePrestation);

router.get('/:id', prestationCtrl.getOnePrestation);

router.get('/', prestationCtrl.getAllPrestations);

module.exports = router;