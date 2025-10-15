import { z } from "zod";

const RolesValidator = z.object({
  name: z
    .string({
      required_error: "Le nom du rôle est requis",
      invalid_type_error: "Le nom du rôle doit être une chaîne de caractères",
    })
    .min(1, "Le nom du rôle est requis")
    .max(100, "Le nom du rôle est trop long"),
});

export default RolesValidator;
