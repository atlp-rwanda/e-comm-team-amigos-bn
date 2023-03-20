import Joi from "joi";
import jwt from "jsonwebtoken";
import models from "../database/models";

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
export const addProduct = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const sellerId = decodedToken.userId;
    const user = await models.User.findByPk(sellerId);
    if (!user) {
      return res.status(400).json({ message: "Seller not found" });
    }
    if (
      sellerId !== decodedToken.userId ||
      decodedToken.userRole !== "vendor"
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const {
      name,
      price,
      quantity,
      available,
      category,
      bonus,
      expiryDate,
      ec,
    } = req.body;
    const images = req.body.images || [];
    const existingProduct = await models.Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists you can update that product instead",
      });
    }
    const product = await models.Product.create({
      userId: sellerId,
      name,
      price,
      quantity,
      available,
      category,
      bonus,
      images,
      expiryDate,
      ec,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default {
  addProduct,
  getAllProduct,
};
