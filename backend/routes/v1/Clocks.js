import express from "express";
import ClocksController from "../../controllers/ClocksController.js";

const router = express.Router();

router.post("/", ClocksController.createClockIn);
router.put("/:id/clock-out", ClocksController.createClockOut);
router.get("/", ClocksController.getAllClocks);
router.get("/user/:userId", ClocksController.getClockByIdUser);

