const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = []; // Simule une base de données

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

// Inscription
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Vérification si l'utilisateur existe déjà
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
});

// Connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérification du mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Mot de passe incorrect' });
  }

  // Génération du token JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Route protégée
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Bienvenue, ${decoded.username}` });
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
