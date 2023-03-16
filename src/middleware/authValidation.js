import Joi from 'joi';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import models from '../database/models';

const signUpValidator = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    telephone: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
      .external(async (value) => {
        const user = await models.User.findOne({
          where: { email: req.body.email },
        });
        if (user) {
          res.status(400).json({ error: 'Email address already in use' });
        }
        return value;
      }),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'password.invalid': 'Password is invalid.',
      }),
  });
  await schema.validateAsync(req.body);
  next();
});
const loginValidator = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'password.invalid': 'Password is invalid.',
      }),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const resetPassValidator = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'password.invalid': 'Password is invalid.',
      }),
    confirmPassword: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'password.invalid': 'Password is invalid.',
      }),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const authorize = (roles) => asyncHandler(async (req, res, next) => {
  const authHeader = await req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided!' });
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const role = decodedToken.role;
  if (!roles.includes(role)) {
    return res.status(401).json({
      error: 'Access denied! You are not allowed to perform this operation.'
    });
  }

  // Set the decoded token as the user property in the request object
  req.user = decodedToken;
  next();
  return res.status(200);
});

export default {
  signUpValidator,
  loginValidator,
  resetPassValidator,
  authorize
};
