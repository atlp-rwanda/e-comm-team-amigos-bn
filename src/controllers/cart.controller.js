import models from "./../database/models";

export async function createCart(req, res) {
    try {
        const cart = req.session.cart || [];

        const productId = req.query.productId;
        const quantity = req.query.quantity;

        cart.push({ productId, quantity });
        req.session.cart = cart;
        res.status(200).json({ message: "cart saved", cart: req.session.cart });


    } catch (err) {
        res.status(500).json({ error: err.message, err });
    }
}