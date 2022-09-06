const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs')

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new Utilisateur({
        ...req.body,
        mot_de_passe: hash,
        date_creation: Date.now(),
      });
      utilisateur.save()
        .then(() => res.status(201).json({ message: `Utilisateur : ${utilisateur._id} créé !`  }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  Utilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            utilisateurId: utilisateur._id,
            token: jwt.sign(
                { utilisateurId: utilisateur._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUtilisateur = (req, res, next) => {
  Utilisateur.updateOne({ _id: req.body.id }, { ...req.body, _id: req.body.id })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllUtilisateurs = (req, res, next) => {
  Utilisateur.find().populate({path: "conversations"})
    .then(utilisateurs => res.status(200).json(utilisateurs))
    .catch(error => res.status(400).json({error}));
};