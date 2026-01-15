import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controller/orderController.js";
import { authMiddleware, autherizationMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/")
  .get(authMiddleware, autherizationMiddleware(["admin"]), getAllOrders) // Admin can see all orders
  .post(authMiddleware, createOrder); // Users can create orders

router.route("/:id")
  .get(authMiddleware, getOrderById) // Users/Admin can see specific order
  .put(authMiddleware, autherizationMiddleware(["admin"]), updateOrderStatus) // Only admin updates status
  .delete(authMiddleware, autherizationMiddleware(["admin"]), deleteOrder); // Only admin deletes

export default router;