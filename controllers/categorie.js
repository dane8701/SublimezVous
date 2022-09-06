const Categorie = require('../models/Categorie');
const fs = require('fs');

exports.createCategorie = (req, res, next) => {
  delete req.body._id;
  const categorie = new Categorie({
    ...req.body
  });
  categorie.save()
  .then(() => {
    res.status(201).json({message: 'Objet enregistré !'})
  })
  .catch((error) => res.status(400).json({error}));
};

exports.modifyCategorie = (req, res, next) => {
    Categorie.updateOne({ _id: req.body.id}, { ...req.body, _id: req.body.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deleteCategorie = (req, res, next) => {
  Categorie.findOne({_id: req.params.id})
    .then(
      (categorie) => {
        if(!categorie) {
          return res.status(404).json({
              error: new Error('Objet non trouvé !')
          });
        }

        Categorie.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json(error));
      }
    );
};

exports.getOneCategorie = (req, res, next) => {
  Categorie.findOne({ _id: req.params.id })
    .then( categorie => res.status(200).json(categorie))
    .catch(error => res.status(400).json({error}));
};

exports.getAllCategories = (req, res, next) => {
  Categorie.find()
  .then(news => res.status(200).json(news))
  .catch(error => res.status(400).json({error}));
};