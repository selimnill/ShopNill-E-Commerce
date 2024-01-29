import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
} from "../controllers/ProductController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// all product
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

// route of photos
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.get("/product", deleteProductController);

export default router;
