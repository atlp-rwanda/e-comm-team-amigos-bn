import models from './../database/models';

export async function createCart(req, res) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cart = await models.Cart.findOne({ where: { userId } });
        const product = { productId, quantity };
        if (cart) {
            cart.products = [...cart.products, product];
            const response = await cart.save();
            res.status(201).json({
                message: 'cart updated',
                cart: response,
            });
        } else {
            const newCart = await models.Cart.create({
                userId,
                products: [product],
            });
            res.status(201).json({
                message: 'cart saved',
                cart: newCart,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, err });
    }
}

export const viewCart = async (req, res) => {
    const userId = req.user.id;
    let cart = await models.Cart.findAll({ where: { userId } });
    cart = cart[0].toJSON();
    try {
        let subTotal = 0;
        if (!cart) {
            return res
                .status(204)
                .json({ error: 'There is no items in the shopping cart' });
        }
        if (cart) {
            let items = 0;
            const productDetails = await Promise.all(
                cart.products.map(async (item) => {
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
            const cartItems = [...productDetails];
            res.status(200).json({
                message: 'Cart Items',
                cartItems,
                cartSummary: { total: subTotal, items: items },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const cleanUpCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await models.Cart.findOne({ where: { userId } });

        if (cart) {
            cart.products = [];
            await cart.save();
            return res
                .status(200)
                .json({ message: 'cart cleared successfully' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export async function deleteItemInCart(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const cart = await models.Cart.findOne({ where: { userId } });
        if (cart) {
            const updatedProducts = cart.products.filter(
                (product) => product.productId !== productId
            );

            cart.products = updatedProducts;
            const response = await cart.save();

            res.status(200).json({
                message: 'Item removed from cart',
                cart: response,
            });
        } else {
            res.status(404).json({
                message: 'Cart not found',
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, err });
    }
}

// Update cart
export async function updateCart(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const { quantity } = req.body;
        const cart = await models.Cart.findOne({ where: { userId } });
        if (cart) {
            const updatedProducts = cart.products.map((product) => {
                if (product.productId === productId) {
                    return { ...product, quantity };
                }
                return product;
            });
            cart.products = updatedProducts;
            const response = await cart.save();
            res.status(200).json({
                message: 'Cart updated',
                cart: response,
            });
        } else {
            return res.status(404).json({
                message: 'Cart not found',
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message, err });
    }
}

module.exports = {
    deleteItemInCart,
    updateCart,
    createCart,
    cleanUpCart,
    viewCart,
};
