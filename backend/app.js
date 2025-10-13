import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/v1/users.js";
import authRoutes from "./routes/v1/auth.js";

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log("Nouvelle requête :", req.method, req.url);
  next();
});


app.use(express.json());
app.use(cors({ origin: process.env.BASE_URL }));

app.use("/v1/users", userRoutes);
app.use("/v1/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export { app };

// import express from "express";
// import cors from "cors";
// import V1Router from "./routes/v1/users.js";
// import authRoutes from "./routes/v1/auth.js";

// export const app = express();

// const BASE_URL = process.env.BASE_URL;

// dotenv.config();

// const app = express();

// app.use((err, req, res, next) => {
//   res.status(err.status).json({ message: err.message });
// });

// app.use(
//   cors({
//     origin: [BASE_URL],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Montage des routeurs Express
// app.use("/v1/users", userRoutes);
// app.use("/v1/auth", authRoutes);

// // Lancement du serveur
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Serveur lancé sur le port ${process.env.PORT || 3000}`);
// });

