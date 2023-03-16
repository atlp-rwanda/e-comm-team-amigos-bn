import Joi from 'joi';

export const validateUserProfile = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      preferredLanguage: Joi.string().required(),
      birthdate: Joi.date().iso().required(),
      telephone: Joi.string().required(),
      billingAddress: Joi.string().required(),
      preferredCurrency: Joi.string().required(),
      gender: Joi.string().required(),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
