import { z } from "zod";

const TeamsValidators = z.object({
  name: z
    .string()
    .min(1, "Le nom de l'équipe est requis")
    .max(100, "Le nom de l'équipe est trop long"),
  
  description: z
    .string()
    .max(255, "La description est trop longue")
    .optional(),
m
});

export default TeamsValidators;