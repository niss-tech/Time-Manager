import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/v1/Users.js";
import authRoutes from "./routes/v1/auth.js";

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log("Nouvelle requête :", req.method, req.url);
  next();
});


const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-custom-header"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/v1/users", userRoutes);
app.use("/v1/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export { app };