// src/controllers/AuthController.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

// 🔹 Schémas Zod pour validation
const loginSchema = z.object({
  email: z.string().email("Email invalide."),
  password: z.string().min(4, "Mot de passe trop court."),
});

const registerSchema = z.object({
  firstname: z.string().min(2, "Prénom trop court."),
  lastname: z.string().min(2, "Nom trop court."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Mot de passe trop court."),
  phone: z.string().optional(),
  profile: z.enum(["admin", "employee"]).default("employee"),
});

export default {
 // 🔹 REGISTER
async register(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Requête vide." });
    }

    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      const firstError = validation.error.errors?.[0]?.message || "Données invalides.";
      return res.status(400).json({ error: firstError });
    }

    const { email, password, firstname, lastname, phone, profile } = validation.data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.users.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Cet email est déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Conversion du numéro avant l’insertion
    const parsedPhone = phone ? Number(phone) : null;

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone: parsedPhone, // <-- ici la conversion est sûre
        profile,
      },
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser.idUser,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phone: newUser.phone,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.error("Erreur dans register:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
},


  // 🔹 LOGIN
  async login(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Requête vide." });
      }

      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        const firstError = validation.error.errors?.[0]?.message || "Données invalides.";
        return res.status(400).json({ error: firstError });
      }

      const { email, password } = validation.data;
      const user = await prisma.users.findFirst({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }

      const token = jwt.sign(
        { id: user.idUser, email: user.email, profile: user.profile },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.idUser,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          profile: user.profile,
        },
      });
    } catch (error) {
      console.error("Erreur dans login:", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // 🔹 PROFILE
  async profile(req, res) {
    try {
      const user = await prisma.users.findUnique({
        where: { idUser: req.user.id },
        select: { idUser: true, firstname: true, lastname: true, email: true, phone: true },
      });

      if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};
