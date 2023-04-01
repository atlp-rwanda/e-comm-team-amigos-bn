import Joi, { options } from 'joi';
import jwt from 'jsonwebtoken';

import models from './../database/models';

export async function validateCartAdd(req, res, next) {
    try {
        const product = await models.Product.findByPk(req.query.productId);
        if (!product)
            return res.status(404).json({ error: 'Product does not exist..' });

        const quantity = req.query.quantity;
        if (quantity < 1)
            return res.status(400).json({ error: 'Quantity cannot be null..' });

        if (req.session.cart) {
            const cartproduct = req.session.cart.find(
                (item) => item.productId == req.query.productId
            );

            if (cartproduct)
                return res.status(400).json({
                    error: 'Product in cart already. Please update the cart.',
                });
        }

        next();
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
}
