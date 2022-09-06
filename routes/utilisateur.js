const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateur');
const multer = require('../middleware/multer-config');

router.post('/signup', utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

router.put('/', utilisateurCtrl.modifyUtilisateur);
router.get('/', utilisateurCtrl.getAllUtilisateurs);

module.exports = router;