import { sendNotification } from '../utils/firebase.admin.util';
import models from './../database/models';
let cart = [];
let cartItems;
export async function createCart(req, res) {
    try {
        const userId = req.user.id;
        const cart = req.session.cart || [];
        const productId = req.query.productId;
        const quantity = req.query.quantity;

        cart.push({ productId, quantity });
        req.session.cart = cart;
        req.session.cartUserId = userId;
        sendNotification(userId, {
            title: 'Ecomm: discount',
            body: 'Notification Body',
            productId,
        });
        res.status(200).json({
            message: 'cart saved',
            cart: req.session.cart,
            cartUserId: req.session.cartUserId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message, err });
    }
}

export const viewCart = async (req, res) => {
    const cart = req.session.cart;

    try {
        let subTotal = 0;
        let items = 0;
        if (!cart) {
            return res
                .status(204)
                .json({ error: 'There is no items in the shopping cart' });
        }
        if (cart) {
            const productDetails = await Promise.all(
                cart.map(async (item) => {
                    const productId = item.productId;
                    const qty = item.quantity;
                    let productData = await models.Product.findOne({
                        where: { id: productId },
                    });
                    let product = productData.toJSON();
                    const total = product.price * qty;
                    subTotal += total;
                    items += qty;
                    return { ...product, total };
                })
            );
            cartItems = [...productDetails];
            res.status(200).json({
                message: 'Cart Items',
                cartItems,
                cartSummary: { total: subTotal, items: items },
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const cleanUpCart = async (req, res) => {
    try {
        const { cartUserId } = req.session;
        console.log(cartUserId, req.user.id);

        if (req.user.id !== cartUserId) {
            // check if the user is authorized to clear the cart
            return res.status(401).json({ error: 'Unauthorized' }); // return error if user is not authorized
        }
        req.session.cart = [];
        return res.status(200).json({ message: 'cart cleared successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update cart
const updateCart = async (req, res) => {
    try {
        // Get the cart from the buyer's session
        cart = req.session.cart;

        // Find the item in the cart with the matching cart ID
        const cartItem = cart.find((item) => item.productId === req.params.id);

        // If the item is not found, return an error message
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update the quantity of the item in the cart
        cartItem.quantity = parseInt(req.body.quantity);

        // Validate that the quantity is a positive integer
        if (cartItem.quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Store the updated cart in the buyer's session
        req.session.cart = cart;

        // Retrieve product details from the database for each item in the updated cart
        const productIds = cart.map((item) => item.productId);
        const products = await models.Product.findAll({
            where: {
                id: productIds,
            },
            attributes: ['id', 'name', 'price', 'images'],
        });
        // Calculate the new cart total
        let total = 0;
        cart.forEach((item) => {
            const product = products.find((p) => p.id === item.productId);

            total += product.price * item.quantity;
            item.name = product.name;
            item.price = product.price;
            item.images = product.images;
        });

        // Send an updated cart confirmation message to the frontend
        res.status(200).json({ message: 'Cart updated', cart, total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateCart,
    createCart,
    cleanUpCart,
    viewCart,
};
