import express from "express";
import AuthRouter from 'v1/auth.js';
import UsersRouter from 'v1/users.js';

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);

export default router;