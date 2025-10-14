import { z } from "zod";

const RolesValidator = z.object({
  name: z
    .string()
    .min(1, "Le nom du rôle est requis")
    .max(100, "Le nom du rôle est trop long"),
  
});

export default RolesValidator;