const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorieSchema = mongoose.Schema({
  nom: { type: String },
  image: { type: String },
  prestations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' }]
});

categorieSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Categorie', categorieSchema);