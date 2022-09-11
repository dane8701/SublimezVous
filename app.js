const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

//routes controllers
const utilisateurRoutes = require('./routes/utilisateur');
const avisRoutes = require('./routes/avis');
const categorieRoutes = require('./routes/categorie');
const prestationRoutes = require('./routes/prestation');
const reservationRoutes = require('./routes/reservation');


const DbServer = "mongodb+srv://sublimezvous:sublimezvous@cluster0.ncyo3zx.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DbServer,
  { useNewUrlParser: true,
  useUnifiedTopology: true }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use(cors());
app.use(cors({origin: true, credentials: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', utilisateurRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/reservation', reservationRoutes);

module.exports = app;