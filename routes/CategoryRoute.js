import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

// routes
// create category
router.post(
  `/create-category`,
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all categories
router.get("/categories", categoryController);

export default router;
