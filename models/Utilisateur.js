const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  nom: { type: String },
  prenom: { type: String },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  telephone: { type: Number, required: true, unique: true },
  rue: { type: String },
  code_postal: { type: Number },
  commune: { type: String },
  date_creation: { type: Date, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);