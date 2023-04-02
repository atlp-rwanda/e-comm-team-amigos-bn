import Joi from "joi";
import models from "./../database/models";


export async function validateAddSubscriber(req, res, next) {
    try {
        const { email, firstName, lastName } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required().label('email'),
            firstName: Joi.string().required().label('firstName'),
            lastName: Joi.string().required().label('lastName')
        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error });

        const subscriber = await models.Newsletter.findOne({ where: { email: email } });
        if (subscriber) return res.status(400).json({ error: 'Email already exists' });

        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function validateSuscriberExistence(req, res, next) {
    try {
        const id = req.body.id || req.query.id;


        const subscriber = await models.Newsletter.findOne({ where: { id } });
        if (!subscriber) return res.status(404).json({ error: 'Subscriber not found' });

        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
