import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

// create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "description is Required",
        });
      case !price:
        return res.status(500).send({
          error: "price is Required",
        });
      case !category:
        return res.status(500).send({
          error: "category is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is Required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is Required and it should be less then 1 MB ",
        });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// update product controller
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required",
        });
      case !description:
        return res.status(500).send({
          error: "description is Required",
        });
      case !price:
        return res.status(500).send({
          error: "price is Required",
        });
      case !category:
        return res.status(500).send({
          error: "category is Required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is Required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is Required and it should be less then 1 MB ",
        });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

// get products
export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo") // avoid photos
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      products,
      total_count: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting products",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: " Get Single Product ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single product",
    });
  }
};

// get photos
export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting photo",
    });
  }
};

// delete product controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting photo",
    });
  }
};

// Product Filter Controller

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while filter product",
    });
  }
};

// Product Pagination
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Product Pagination",
    });
  }
};

// product list base on pages
export const productlistController = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1 * perPage).limit(perPage))
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in product per pages",
    });
  }
};
