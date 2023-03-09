import Joi from 'joi';
import bcrypt from 'bcrypt';

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/).required(),
  });
  return schema.validate(user);
};

const hashPassword = async (password) => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};
export default {
  validateUser,
  hashPassword,
};
