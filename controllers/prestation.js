const Prestation = require('../models/Prestation');
const Categorie = require('../models/Categorie');
const fs = require('fs');

exports.createPrestation = (req, res, next) => {
    //suppression de l'_id dans le cas où il apparait dans la requête
    delete req.body._id;
    //instatiation d'une prestation
    const prestation = new Prestation({
        ...req.body,
    });
    //enregistrement de l'objet prestation dans la bd
    prestation.save()
    .then(() => {
        //Ajoute dans le tableau prestations de l'objet categorie dont l'id correspond la prestation venant d'etre sauvegardé
        Categorie.updateMany({ '_id': prestation.categorie.toString() }, { $push: { prestations: prestation._id } })
        .then()
        .catch((err) => {
          res.status(400).json({"err": err})
        })
        res.status(201).json({message: 'Objet enregistré !'})
    })
    .catch((error) => res.status(400).json({"error": error}));
};

exports.modifyPrestation = (req, res, next) => {
    // on cherche l'objet qu'on veut modifier | ici on modifie l'objet
    Prestation.updateOne({ _id: req.body.id }, { ...req.body, _id: req.body.id })
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
  //findOne permet de trouver un objet dont _id = req.params.id
  Prestation.findOne({ _id: req.params.id }).populate({path: "categorie"})
    .then( prestation => res.status(200).json(prestation))
    .catch(error => res.status(400).json({error}));
};

exports.getAllPrestations = (req, res, next) => {
  Prestation.find().populate({path: "categorie"})
  .then(prestations => res.status(200).json(prestations))
  .catch(error => res.status(400).json({error}));
};