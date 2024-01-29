import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/CategoryController.js";

const router = express.Router();

// routes
router.post(
  `/create-category`,
  requireSignIn,
  isAdmin,
  createCategoryController
);

export default router;
