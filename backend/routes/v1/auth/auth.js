// src/routes/v1/auth/auth.js
import express from 'express';
import { PrismaClient } from '@prisma/client';  
import bcrypt from 'bcrypt';  

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { mail, password } = req.body;  // Récupération des informations envoyées dans le corps de la requête

  if (!mail || !password) {
    return res.status(400).json({ message: 'Les identifiants sont requis.' });
  }

  try {
    // Recherche de l'utilisateur dans la base de données par son adresse mail
    const user = await prisma.users.findFirst({
      where: { mail }, // Recherche l'utilisateur par son adresse mail
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }

    // Comparaison du mot de passe envoyé avec celui stocké en base (haché)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }
    // console.log(user);
    // Connexion réussie, on retourne les informations de l'utilisateur
    return res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.idUser,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.mail,
        phone: user.phone,
        profile: user.profile
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
  
});
router.post('/forgot', async (req, res) => {
  const { mail, phone } = req.body;  // Récupération des informations envoyées dans le corps de la requête

  if (!mail || !phone) {
    return res.status(400).json({ message: 'Les identifiants sont requis.' });
  }

  try {
    // Recherche de l'utilisateur dans la base de données par son adresse mail
    const user = await prisma.users.findFirst({
      where: { mail }, // Recherche l'utilisateur par son adresse mail
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }

    // Comparaison du telephone envoyé avec celui stocké en base
    const isPhoneValid = phone == user.phone;
    if (!isPhoneValid) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }

    // Connexion réussie, on retourne les informations de l'utilisateur
    return res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.idUser,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.mail,
        phone: user.phone
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});
export default router;
