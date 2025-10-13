import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import UsersValidator from "../../validators/UsersValidator.js"; 

const router = express.Router();
const prisma = new PrismaClient();

const validatedUser = (req, res, next) => {
  try {
    UsersValidator.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// Route pour ajouter un utilisateur
router.post("/", async (req, res) => {
  let validatedUser;

  try {
    // Valider les données envoyées par le client avec le validateur UserValidator
    validatedUser = UsersValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  try {
    const entry = await prisma.users.create({
      data: {
        firstname: validatedUser.firstname,
        lastname: validatedUser.lastname,
        password: validatedUser.password,
        email: validatedUser.email,
        phone: validatedUser.phone,
        profile: validatedUser.profile,
      },
    });

    res.status(201).json(entry);
  } catch (prismaError) {
    console.error(prismaError);
    res.status(500).json({ error: "Une erreur est survenue lors de la création de l'employé." });
  }
});

// Obtenir tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

  // Obtenir un utilisateur par ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.users.findUnique({
        where: { idUser: parseInt(id) },
      });
      if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
    }
  });

// Mettre à jour un utilisateur
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { password, ...otherData } = req.body;

  try {
    let updatedData = { ...otherData };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.users.update({
      where: { id_user: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
  }
});
  
  // Supprimer un utilisateur
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.users.delete({
        where: { idUser: parseInt(id) },
      });
      res.status(200).json({ message: "Utilisateur supprimée avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
  });


export default router;
