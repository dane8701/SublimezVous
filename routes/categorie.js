const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const categorieCtrl = require('../controllers/categorie');

router.post('/', multer, categorieCtrl.createCategorie);

router.put('/', multer, categorieCtrl.modifyCategorie);

router.delete('/:id', categorieCtrl.deleteCategorie);

router.get('/:id', categorieCtrl.getOneCategorie);

router.get('/', categorieCtrl.getAllCategories);

module.exports = router;