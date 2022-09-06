const Avis = require('../models/Avis');
const Reservation = require('../models/Reservation');
const fs = require('fs');

exports.createAvis = (req, res, next) => {
  delete req.body._id;
  const avis = new Avis({
    ...req.body
  });
  avis.save()
  .then(() => {
    res.status(201).json({message: 'Objet enregistré !'})
  })
  .catch((error) => res.status(400).json({error}));
};

exports.modifyAvis = (req, res, next) => {
    Avis.updateOne({ _id: req.body.id}, { ...req.body, _id: req.body.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deleteAvis = (req, res, next) => {
  Avis.findOne({_id: req.params.id})
    .then(
      (avis) => {
        if(!avis) {
          return res.status(404).json({
              error: new Error('Objet non trouvé !')
          });
        }

        Avis.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json(error));
      }
    );
};

exports.getOneAvis = (req, res, next) => {
  Avis.findOne({ _id: req.params.id }).populate({path: "reservation"})
    .then( avis => res.status(200).json(avis))
    .catch(error => res.status(400).json({error}));
};

exports.getAllAviss = (req, res, next) => {
  Avis.find().populate({path: "reservation"})
  .then(news => res.status(200).json(news))
  .catch(error => res.status(400).json({error}));
};