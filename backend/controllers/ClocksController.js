import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import ClocksValidator from "../validators/ClocksValidator.js";

const prisma = new PrismaClient();

export default {
  // Créer une entrée de pointage (clock-in)
  async createClockIn(req, res) {
    console.log("Requête reçue :", req.body);
    try {
      const validatedClock = ClocksValidator.parse(req.body);
      const newClock = await prisma.clocks.create({
        data: {
          userId: validatedClock.userId,
          clockIn: validatedClock.clockIn,
          clockOut: null,
        },
      });
      res.status(201).json(newClock);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Erreur POST /clocks :", error);
      res.status(500).json({ error: "Erreur serveur lors de la création du pointage" });
    }
  },

  // Créer une entrée de pointage (clock-out)
  async createClockOut(req, res) {
    const { id } = req.params;
    const clockOutTime = req.body.clockOut;

    try {
      const validatedData = ClocksValidator.pick({ clockOut: true }).parse({ clockOut: clockOutTime });

      const existingClock = await prisma.clocks.findUnique({
        where: { idClock: parseInt(id) },
      });

      if (!existingClock) {
        return res.status(404).json({ error: "Pointage introuvable." });
      }

      const hoursWorked = Math.round(
        ((new Date(validatedData.clockOut) - existingClock.clockIn) / 3600000) * 100
      ) / 100;
      console.log(hoursWorked);

      const updatedClock = await prisma.clocks.update({
        where: { idClock: parseInt(id) },
        data: {
          clockOut: validatedData.clockOut,
          hoursWorked: hoursWorked,
        },
      });

      res.json(updatedClock);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Erreur PATCH /clocks/:id/clock-out :", error);
      res.status(500).json({ error: "Erreur serveur lors de la mise à jour du pointage" });
    }
  },

  // Afficher tous les pointages
  async getAllClocks(req, res) {
    try {
      const clocks = await prisma.clocks.findMany();
      res.status(200).json(clocks);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },

  // Afficher un pointage par ID utilisateur
  async getClockByIdUser(req, res) {
    try {
      const { id } = req.params;
      const clock = await prisma.clocks.findMany({
        where: { userId: parseInt(id) },
      });

      if (clock.length === 0) {
        return res.status(404).json({ error: "Aucun pointage trouvé pour cet utilisateur." });
      }

      res.json(clock);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
};
