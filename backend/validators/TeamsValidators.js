import { z } from "zod";

const TeamsValidator = z.object({
  name: z
    .string({
      required_error: "Le nom de l'équipe est requis",
      invalid_type_error: "Le nom de l'équipe doit être une chaîne de caractères",
    })
    .min(1, "Le nom de l'équipe est requis")
    .max(100, "Le nom de l'équipe est trop long"),

  description: z
    .string({
      invalid_type_error: "La description doit être une chaîne de caractères",
    })
    .max(255, "La description est trop longue")
    .optional(),

  managerId: z
    .number({
      required_error: "L'identifiant du manager est requis",
      invalid_type_error: "L'identifiant du manager doit être un nombre",
    })
    .int()
    .positive("L'identifiant du manager doit être positif"),
});

export default TeamsValidator;
