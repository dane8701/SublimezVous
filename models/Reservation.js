const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reservationSchema = mongoose.Schema({
    reference: { type: String, required: true, unique: true },
    message: { type: String },
    tva: { type: Number, required: true },
    debut: { type: Date, required: true },
    raison_annulation: { type: String },
    date_creation: { type: Date, required: true },
    estPaye: { type: Boolean },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    prestations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation', required: true }]
});

//permet de faire un pre-enregistrement des champs unique
reservationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Reservation', reservationSchema);