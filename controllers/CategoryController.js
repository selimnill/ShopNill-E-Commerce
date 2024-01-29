import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const name = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is Required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = await CategoryModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};
