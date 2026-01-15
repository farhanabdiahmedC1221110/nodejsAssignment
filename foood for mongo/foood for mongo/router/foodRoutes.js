import express from "express";
import {
    createFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood,
} from "../controller/foodController.js";
import { authMiddleware, autherizationMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/")
    .get(getAllFoods)
    .post(authMiddleware, autherizationMiddleware(["admin"]), createFood);

router.route("/:id")
    .get(getFoodById)
    .put(authMiddleware, autherizationMiddleware(["admin"]), updateFood)
    .delete(authMiddleware, autherizationMiddleware(["admin"]), deleteFood);

export default router;
