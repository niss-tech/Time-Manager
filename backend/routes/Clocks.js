import express from "express";
import ClocksController from "../controllers/ClocksController.js";

const router = express.Router();

router.post("/", ClocksController.clockIn);
router.put("/:id/clockout", ClocksController.clockOut);
router.get("/", ClocksController.getAllClocks);
router.get("/user/:userId", ClocksController.getClockByIdUser);

export default router;
