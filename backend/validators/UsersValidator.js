import { z } from "zod";

const UsersValidator = z.object({
  firstname: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long"),

  lastname: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),

  email: z
    .string()
    .email("L'adresse email n'est pas valide")
    .max(100, "L'adresse email est trop longue"),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit inclure au moins une majuscule, un chiffre et un caractère spécial"
    ),

  phone: z.union([z.string(), z.number()]), 

  profile: z
    .string()
    .min(1, "Le profil est requis"),
});

export default UsersValidator;
