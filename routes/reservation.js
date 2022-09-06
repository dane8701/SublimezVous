const express = require('express');
const router = express.Router();

const reservationCtrl = require('../controllers/reservation');

router.post('/', reservationCtrl.createReservation);

router.put('/:id', reservationCtrl.modifyReservation);

router.delete('/:id', reservationCtrl.deleteReservation);

router.get('/:id', reservationCtrl.getOneReservation);

router.get('/', reservationCtrl.getAllReservations);

module.exports = router;