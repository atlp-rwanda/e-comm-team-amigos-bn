import Joi, { options } from 'joi';
import jwt from 'jsonwebtoken';

import models from './../database/models';

export async function validateCartAdd(req, res, next) {
    try {
        const userId = req.user.id;
        let product = await models.Product.findByPk(req.body.productId);
        product = product.toJSON();
        if (!product)
            return res.status(404).json({ error: 'Product does not exist..' });

        const quantity = parseInt(req.body.quantity);
        if (quantity < 1 || quantity > product.quantity) {
            return res.status(400).json({ error: 'Quantity not Available' });
        }
        const cart = await models.Cart.findOne({ where: { userId } });
        if (cart) {
            const cartproduct = await cart.products.find(
                (item) => item.productId == req.body.productId
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
export async function validateCartUpdate(req, res, next) {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const product = await models.Product.findOne({
            where: { id: productId },
        });
        const { quantity } = req.body;
        const cart = await models.Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
            });
        }

        const existItemInCart = cart.products.find(
            (cartProduct) => cartProduct.productId === productId
        );

        if (!existItemInCart) {
            return res.status(404).json({
                message: 'Item not found in cart',
            });
        }

        if (quantity < 1 || quantity > product.quantity) {
            return res.status(400).json({ error: 'Quantity not available' });
        }

        next();
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
}
