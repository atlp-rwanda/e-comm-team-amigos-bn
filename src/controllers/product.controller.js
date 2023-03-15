// function to save production description
import models from '../database/models';

export const getAvailableProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      where: { available: true }
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProductAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    if (typeof available !== 'boolean') {
      return res.status(400).json({ error: 'Invalid availability status' });
    }
    const updatedProduct = await models.Product.update({ available }, {
      where: { id },
      returning: true
    });
    res.json({ updatedProduct, message: 'updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
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
  getAvailableProducts,
  updateProductAvailability,
  addProduct
};