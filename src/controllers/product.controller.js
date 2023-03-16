import Joi from "joi";
import models from "../database/models";
export const addProduct = async (req, res) => {
  try {
    const product = await models.Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const listProduct = await models.Product.findAll();
    if (listProduct.length <= 0) {
      res.status(404).json({
        Status: "Not Found",
        error: "There is no product in Stock",
      });
    } else {
      res
        .json({
          Status: "OK",
          Message: "List of all Products in our collections",
          listProduct,
        })
        .status(200);
    }
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
export default {
  addProduct,
  getAllProduct,
};
