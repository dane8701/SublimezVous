const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorieSchema = mongoose.Schema({
  nom: { type: String, unique: true },
  image: { type: String, unique: true },
  prestations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' }]
});

categorieSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Categorie', categorieSchema);