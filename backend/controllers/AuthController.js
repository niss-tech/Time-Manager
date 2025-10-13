// src/controllers/AuthController.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export default {
  // 🔹 Connexion
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Identifiants requis." });

      const user = await prisma.users.findFirst({ where: { email } });
      if (!user)
        return res.status(401).json({ message: "Identifiants incorrects." });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ message: "Mot de passe incorrect." });

      const token = jwt.sign(
        { id: user.idUser, email: user.email },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.idUser,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },

  // Profil connecté
  async profile(req, res) {
    try {
      const user = await prisma.users.findUnique({
        where: { idUser: req.user.id },
        select: {
          idUser: true,
          firstname: true,
          lastname: true,
          email: true,
          phone: true,
        },
      });

      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
