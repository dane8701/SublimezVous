const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const avisSchema = mongoose.Schema({
  note: { type: String },
  description: { type: String },
  date: { type: String, required: true, unique: true },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true }
});

avisSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Avis', avisSchema);