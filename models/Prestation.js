const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const prestationSchema = mongoose.Schema({
    libelle: { type: String, unique: true },
    description: { type: String },
    prix: { type: String, required: true, unique: true },
    temps: { type: String, required: true },
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true }
});

prestationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Prestation', prestationSchema);