import express from "express";
import {
  getAllFruids,
  getFruidById,
  createFruid,
  updateFruid,
  deleteFruid,
} from "../controller/food.controller.js";

const router = express.Router();
router.get("/fruid", getAllFruids);
router.get("/fruid/:id", getFruidById);
router.post("/fruid", createFruid);
router.put("/fruid/:id", updateFruid);
router.delete("/fruid/:id", deleteFruid);

export default router;