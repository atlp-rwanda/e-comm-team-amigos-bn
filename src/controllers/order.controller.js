import models from '../database/models';
import asyncHandler from 'express-async-handler';

exports.createOrder = asyncHandler(async (req, res, next) => {
    let orderProducts;
    let order = await models.Order.create({
        userId: req.user.id,
        expected_delivery_date: Date.now() + 4 * 24 * 60 * 60 * 1000,
    });

    order = order.toJSON();

    const promises = req.body.items.map(async (item) => {
        let orderProduct = await models.OrderProduct.create({
            orderId: order.id,
            productId: item.product,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        });

        return orderProduct;
    });

    orderProducts = await Promise.all(promises);

    res.status(201).json({
        status: 'success',
        data: {
            order: {
                ...order,
                products: orderProducts,
            },
        },
    });
});

exports.getOrders = asyncHandler(async (req, res, next) => {
    let filter = {};
    const userId = req.user.id;
    const userRole = req.user.role;
    if (userRole === 'normal') filter = { where: { userId } };

    const orders = await models.Order.findAll({
        ...filter,
        include: [
            {
                model: models.OrderProduct,
                as: 'OrderProducts',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: models.Product,
                        as: 'Product',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'ec'],
                        },
                    },
                ],
            },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).json({
        status: 'success',
        count: orders.length,
        data: { orders },
    });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
    let order = await models.Order.findByPk(req.params.id);
    const orderProductUpdates = req.body.items;

    if (!order)
        return res
            .status(404)
            .json({ status: 'success', message: 'Order not found.' });

    order = order.toJSON();

    if (req.user.id !== order.userId)
        return res.status(403).json({
            status: 'success',
            message: 'Access denied! You are not allowed to update this order',
        });

    // Delete curent order products
    await models.OrderProduct.destroy({
        where: { orderId: order.id },
    });

    const promises = orderProductUpdates.map(async (item) => {
        let updateOrderProduct = await models.OrderProduct.create({
            orderId: order.id,
            productId: item.product,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        });

        return updateOrderProduct;
    });

    const updatedOrderProducts = await Promise.all(promises);

    res.status(201).json({
        status: 'success',
        data: {
            order: {
                ...order,
                products: updatedOrderProducts,
            },
        },
    });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const order = await models.Order.findByPk(id);

    if (!order)
        return res.status(404).json({
            status: 'fail',
            message: 'Order not found.',
        });

    if (order.dataValues.userId !== req.user.id)
        return res.status(403).json({
            status: 'fail',
            message: 'Access denied! You are not allowed to delete this order',
        });

    await order.destroy();

    res.status(200).json({
        status: 'success',
        message: 'Order deleted successfully.',
    });
});
