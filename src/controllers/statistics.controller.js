import { Op } from 'sequelize';
import { OrderProduct, Product } from '../database/models';
export const getSalesStats = async (req, res) => {
    try {
        const userId  = req.user.id;
        const { startDate, endDate } = req.query;

        let orderItems = await OrderProduct.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: {
                model: Product,
                as: 'Product',
                attributes: ['id', 'name', 'userId', 'price'],
                where: {
                    userId: userId,
                },
            },
        });
        orderItems = JSON.parse(JSON.stringify(orderItems));
        const totalRevenue = orderItems.reduce(
            (acc, curr) => acc + curr.Product.price * curr.quantity,
            0
        );

        const numOrders = orderItems.reduce(
            (acc, curr) =>
                curr.order_id in acc ? acc : { ...acc, [curr.order_id]: true },
            {}
        );
        const productsSold = orderItems.reduce((acc, curr) => {
            const productId = curr.productId;
            const quantity = curr.quantity;
            const name = curr.Product.name;
            return {
                ...acc,
                [productId]: {
                    quantity:
                        productId in acc
                            ? acc[productId].quantity + quantity
                            : quantity,
                    name,
                },
            };
        }, {});

        const topSellingProducts = await Promise.all(
            Object.entries(productsSold)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(async ([productId, quantitySold]) => {
                    const product = await Product.findByPk(productId);
                    return {
                        id: productId,
                        quantitySold,
                        name: product.name,
                    };
                })
        );

        return res.json({
            totalRevenue,
            numOrders: Object.keys(numOrders).length,
            productsSold,
            topSellingProducts,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};
export default { getSalesStats };
