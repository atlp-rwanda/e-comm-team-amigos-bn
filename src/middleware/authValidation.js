import Joi from "joi";
import models from "../database/models";

const signUpValidator = async (req, res, next) => {
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
<<<<<<< HEAD
=======
        // Check if email already exists in the database
>>>>>>> ft(signUp):sign up a user
        let user = await models.User.findOne({
          where: { email: req.body.email },
        });
        if (user) {
<<<<<<< HEAD
          res.status(400).json({error: 'Email address already in use'})
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
=======
          throw new Error("Email address already in use");
        }
        return value;
      }),
      password: Joi.string().required().min(8),
  });

>>>>>>> ft(signUp):sign up a user
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
<<<<<<< HEAD
    res.status(400).send(error.message);
  }
};
export default {
  signUpValidator,
};
=======
    console.log(error);
    res.status(400).send(error.message);
  }
};

export default {
  signUpValidator,
};
>>>>>>> ft(signUp):sign up a user
