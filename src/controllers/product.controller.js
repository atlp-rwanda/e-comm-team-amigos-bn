//function to save production description
import Joi from "joi";
import models from '../database/models'
export const addProduct = async (req, res) => {
  // const schema = Joi.object({
  //   name: Joi.string().required(),
  //   price: Joi.number().required(),
  //   quantity: Joi.number().required(),
  //   available: Joi.boolean().required(),
  //   category: Joi.number().required(),
  //   sellerId: Joi.number().required(),
  //   bonus: Joi().number(),
  //   image: Joi.array.items(Joi.string()),
  //   expiryDate: Joi.date(),
  //   ec: Joi.number(),
  // });

  try {
    // Validate the input data against the schema

    // Create a new Product record in the database with the validated data
    const product = await models.Product.create(req.body);

    // Return the newly created Product record to the client
    res.status(201).json(product);
  } catch (error) {
    // Return an error response if the input data is invalid or there was an error creating the Product record
    res.status(400).json({ message: error.message });
  }
};
export default {
  addProduct,
};
