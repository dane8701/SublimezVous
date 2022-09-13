const Reservation = require('../models/Reservation');
const Utilisateur = require('../models/Utilisateur');
const Prestation = require('../models/Prestation');
const fs = require('fs');

exports.createReservation = (req, res, next) => {
  delete req.body._id;

  Reservation.count()
  .then(e => {
      const reservationNumber = `R${e}`      
      const reservation = new Reservation({
        ...req.body,
        reference: reservationNumber,
        date_creation: Date.now(),
      });

      reservation.save()
      .then(() => {
        Utilisateur.updateMany({ '_id': reservation.utilisateur.toString() }, { $push: { reservations: reservation._id } })
            .then()
            .catch((err) => {
              res.status(400).json({err})
            })
        res.status(201).json({message: 'Objet enregistré !'})
      })
      .catch((error) => res.status(400).json({"error 2": error}));
  })
  .catch()
};

exports.modifyReservation = (req, res, next) => {
    Reservation.updateOne({ _id: req.body.id}, { ...req.body, _id: req.body.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deleteReservation = (req, res, next) => {
  Reservation.findOne({_id: req.params.id})
    .then(
      (reservation) => {
        if(!reservation) {
          return res.status(404).json({
              error: new Error('Objet non trouvé !')
          });
        }

        Reservation.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json(error));
      }
    );
};

exports.getOneReservation = (req, res, next) => {
  Reservation.findOne({ _id: req.params.id }).populate([{path: "prestations"}])
    .then( reservation => res.status(200).json(reservation))
    .catch(error => res.status(400).json({error}));
};

exports.getAllReservations = (req, res, next) => {
  Reservation.find().populate([{path: "prestations"}])
  .then(reservations => res.status(200).json(reservations))
  .catch(error => res.status(400).json({"error": error}));
};