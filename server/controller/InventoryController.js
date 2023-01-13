import HttpError from "../models/http-error.js";
import bodyParser from "body-parser";
//import { validator } from "express-validator";

import Product from "../models/product-schema.js";


const getProductById = (req, res, next) => {
  const pid = req.params.pid;
  const product = DUMMY_PRODUCT.find((p) => {
    return p.id === pid;
  });
  if (!product) {
    throw new HttpError("Could not find the product on given id", 404);
  }
  res.json({ product });
};

const createProduct = async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    unit: req.body.unit,
    otherDetails: req.body.otherDetails,
  });

  try {
    await product.save();
  } catch {
    const error = new HttpError(
      "Invalid input passed, pleace check your input",
      500
    );
    return next(error);
  }

  res.status(201).json({ createProduct });
};

const removeProduct = (req, res, next) => {
  const id = req.params.id;
  const product = DUMMY_PRODUCT.find((p) => {
    return p.id === pid;
  });
};

const updateName = (req, res, next) => {
  const name = req.body;
  const id = req.params.id;

  const updatedProduct = { ...DUMMY_PRODUCT.find((p) => p.id === id) };
  const placeIndex = DUMMY_PRODUCT.findIndex((p) => pid === id);
  updatedProduct.name = name;

  res.status(200).json({ product: updatedProduct });
};

export default { getProductById, createProduct, removeProduct, updateName };
