const Prestation = require('../models/Prestation');
const Categorie = require('../models/Categorie');
const fs = require('fs');

exports.createPrestation = (req, res, next) => {
    delete req.body._id;
    let images = [];  
    for (let file of req.files) {
        images.push(`${req.protocol}://${req.get('host')}/images/${file.filename}`,)
    }
    const prestation = new Prestation({
        ...req.body,
        images: images
    });
    prestation.save()
    .then(() => {
        Categorie.updateMany({ '_id': prestation.categorie.toString() }, { $push: { prestations: prestation._id } })
        .then()
        .catch((err) => {
          res.status(400).json({err})
        })
        res.status(201).json({message: 'Objet enregistré !'})
    })
    .catch((error) => res.status(400).json({error}));
};

exports.modifyPrestation = (req, res, next) => {
    let images = [];  
    for (let file of req.files) {
        images.push(`${req.protocol}://${req.get('host')}/images/${file.filename}`,)
    }
    Prestation.updateOne({ _id: req.body.id}, { ...req.body, _id: req.body.id, images: images })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deletePrestation = (req, res, next) => {
  Prestation.findOne({_id: req.params.id})
    .then(
      (prestation) => {
        if(!prestation) {
          return res.status(404).json({
              error: new Error('Objet non trouvé !')
          });
        }

        Prestation.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json(error));
      }
    );
};

exports.getOnePrestation = (req, res, next) => {
  Prestation.findOne({ _id: req.params.id }).populate({path: "categorie"})
    .then( prestation => res.status(200).json(prestation))
    .catch(error => res.status(400).json({error}));
};

exports.getAllPrestations = (req, res, next) => {
  Prestation.find().populate({path: "categorie"})
  .then(news => res.status(200).json(news))
  .catch(error => res.status(400).json({error}));
};