import express from "express";
import cors from "cors";
import AuthRouter from './v1/auth/auth.js';
import UsersRouter from './v1/Users.js';
import ClocksRouter from './v1/Clocks.js';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/clocks", ClocksRouter);

export default router;