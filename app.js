const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

//routes controllers
// const userRoutes = require('./routes/user');


const DbServer = ""
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

// app.use('/api/auth', userRoutes);

module.exports = app;