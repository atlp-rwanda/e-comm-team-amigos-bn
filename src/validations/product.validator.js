// File: validateProductInput.js
import Joi from "joi";
import models from "./../database/models";
import { transformUserRoles } from "../helpers/transformUserRoles";

const validateProductInput = (req, res, next) => {
  try {


    const schema = Joi.object({
      name: Joi.string().trim().required(),
      price: Joi.number().integer().min(1).required(),
      quantity: Joi.number().integer().min(1).required(),
      available: Joi.boolean().required(),
      category: Joi.string().trim().required(),
      bonus: Joi.number().integer().min(0).required(),
      images: Joi.array()
        .items(
          Joi.string()
            .uri({ scheme: ['http', 'https'] })
            .trim()
            .required()
        )
        .min(4)
        .max(8)
        .unique(),
      expiryDate: Joi.date().iso(),
      ec: Joi.number().integer().min(0).allow(null),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default validateProductInput;

export async function validateProductUpdate(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().label("name"),
      price: Joi.number().label("price"),
      images: Joi.array().items(Joi.string()).max(8).min(4).label("images"),
      bonus: Joi.number().label("bonus"),
      available: Joi.boolean().label("available"),
      expiryDate: Joi.date().label("expiryDate"),
      quantity: Joi.number().label("quantity"),
      category: Joi.string().label("category"),
      ec: Joi.number().min(0).label("ec")
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({
        error: error.message,
        message: "Product not updated."
      });


    const product = await models.Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found!" });

    const userRoles = transformUserRoles(req.user.UserRoles) 

    const productObj = product.toJSON();
    if (productObj.userId !== req.user.id && !(userRoles.includes("Admin"))) return res.status(401).json({ message: "Cannot update a product outside of your collection!" });

    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
