import Joi from 'joi';
import asyncHandler from 'express-async-handler';
import models from '../database/models';

const signUpValidator = asyncHandler(async (req, res, next) => {
    const user = await models.User.findOne({
        where: { email: req.body.email },
    });
    if (user) {
        return res.status(400).json({
            error: 'Email address already in use',
        });
    }
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
                    return res.status(400).json({
                        error: 'Email address already in use',
                    });
                }
                return value;
            }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
                'string.empty': 'Password is required.',
                'string.base': 'Password must be a string.',
                'string.min':
                    'Password must be at least {#limit} characters long.',
                'password.invalid': 'Password is invalid.',
            }),
        role: Joi.string().valid('Merchant', 'Customer').messages({
            'any.only': "Role must be either 'Merchant', 'Customer'.",
        }),
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
});

const loginValidator = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
                'string.empty': 'Password is required.',
                'string.base': 'Password must be a string.',
                'string.min':
                    'Password must be at least {#limit} characters long.',
                'password.invalid': 'Password is invalid.',
            }),
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const resetPassValidator = async (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
                'string.empty': 'Password is required.',
                'string.base': 'Password must be a string.',
                'string.min':
                    'Password must be at least {#limit} characters long.',
                'password.invalid': 'Password is invalid.',
            }),
        confirmPassword: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
                'string.empty': 'Password is required.',
                'string.base': 'Password must be a string.',
                'string.min':
                    'Password must be at least {#limit} characters long.',
                'password.invalid': 'Password is invalid.',
            }),
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};
export default {
    signUpValidator,
    loginValidator,
    resetPassValidator,
};
