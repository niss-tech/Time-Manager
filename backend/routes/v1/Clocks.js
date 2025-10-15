import express from "express";
import { PrismaClient } from "@prisma/client";
import ClocksValidator from "../validators/ClocksValidator.js";
import { z } from "zod";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const clocks = await prisma.clocks.findMany({
      include: { user: true }, // inclut les infos de l’utilisateur associé
    });
    res.json(clocks);
  } catch (error) {
    console.error("Erreur GET /clocks :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des pointages" });
  }
});


router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

  try {
    const clock = await prisma.clocks.findUnique({
      where: { idClock: id },
      include: { user: true },
    });
    if (!clock) return res.status(404).json({ error: "Pointage introuvable" });

    res.json(clock);
  } catch (error) {
    console.error("Erreur GET /clocks/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération du pointage" });
  }
});


router.post("/", async (req, res) => {
  try {
    // Validation avec Zod
    const validatedData = ClocksValidator.parse(req.body);

    const newClock = await prisma.clocks.create({
      data: validatedData,
    });

    res.status(201).json(newClock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Erreur POST /clocks :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création du pointage" });
  }
});

// On crée un validator plus permissif pour la mise à jour
const UpdateClockValidator = ClocksValidator.partial();

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

  try {
    const validatedData = UpdateClockValidator.parse(req.body);

    const updatedClock = await prisma.clocks.update({
      where: { idClock: id },
      data: validatedData,
    });

    res.json(updatedClock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Erreur PATCH /clocks/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour du pointage" });
  }
});


export default router;
