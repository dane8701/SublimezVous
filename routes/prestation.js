const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const prestationCtrl = require('../controllers/prestation');

router.post('/', prestationCtrl.createPrestation);

router.put('/', multer, prestationCtrl.modifyPrestation);

router.delete('/:id', prestationCtrl.deletePrestation);

router.get('/:id', prestationCtrl.getOnePrestation);

router.get('/', prestationCtrl.getAllPrestations);

module.exports = router;