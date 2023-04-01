import models from '../database/models';

const checkout = async (req, res) => {
    try {
        // Get the request body
        const { products, deliveryInfo } = req.body
        if (!products || !deliveryInfo) {
            return res.status(400).json({ message: "Missing some required fields" });
        }

        // Create a new order
        const order = await models.Order.create({
            userId: req.user.id,
            status: 'pending',
            expected_delivery_date: deliveryInfo.expected_delivery_date,
        });

        const orderProducts = await Promise.all(
            products.map(async (item) => {
                const product = await models.Product.findByPk(item.productId);

                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                if (product.quantity <= 0) {
                    return res.status(400).json({ message: "Product is out of stock" });
                }

                await models.OrderProduct.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: product.price,
                });

                return {
                    orderId: order.id,
                    productId: item.productId,
                    name: product.name,
                    quantity: item.quantity,
                    unitPrice: product.price,
                };
            })
        );

        return res.status(200).json({ orderId: order.id, orderProducts });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error processing order' });

    }
}

export default {
    checkout
}