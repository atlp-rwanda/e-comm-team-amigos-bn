import Joi from "joi";
import models from "../database/models";
import jwt from "jsonwebtoken"
import { verifyToken } from "../middleware/verifyToken";


export const addToWishlist = async (req, res) => {
  try {
      const buyerId = req.user.id; 
      const productId = req.params.id;

      const product = await models.Product.findOne({
        where: { id: productId },
      });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const existingWishlistItem = await models.Wishlist.findOne({
        where: { productId, buyerId },
      });
  
      if (existingWishlistItem) {
        return res.status(409).json({ message: "Product already in wishlist" });
      }
  
      const wishlistItem = await models.Wishlist.create({
        productId,
        buyerId,
      });
  
      res.status(200).json({
        message: "Product has been added to your wishlist",
        wishlistItem,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
      const buyerId = req.user.id; 
      const productId = req.params.id;

      const existingWishlistItem = await models.Wishlist.findOne({
        where: { productId, buyerId },
      });
  
      if (!existingWishlistItem) {
        return res.status(404).json({ message: "Product not found in wishlist" });
      }

      await existingWishlistItem.destroy();

      res.status(200).json({
        message: "Product has been removed from your wishlist",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addToWishlist,
  removeFromWishlist
};