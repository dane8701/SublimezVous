const express = require('express');
const router = express.Router();

const categorieCtrl = require('../controllers/categorie');

router.post('/', categorieCtrl.createCategorie);

router.put('/:id', categorieCtrl.modifyCategorie);

router.delete('/:id', categorieCtrl.deleteCategorie);

router.get('/:id', categorieCtrl.getOneCategorie);

router.get('/', categorieCtrl.getAllCategories);

module.exports = router;