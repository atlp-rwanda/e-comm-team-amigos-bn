import Joi from 'joi';

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
