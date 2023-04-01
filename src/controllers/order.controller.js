import jwt from 'jsonwebtoken';
import socketIo from 'socket.io';
import http from 'http';
import app from '../app';
import models from '../database/models';
import asyncHandler from 'express-async-handler';

const ioServer = socketIo(server);
const server = http.createServer(app);

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

// Retrieve order status information
exports.getOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        // Retrieve the order status information from the database
        const order = await models.Order.findOne({
            where: {
                id: orderId,
            },
            attributes: ['id', 'status', 'expected_delivery_date'],
        });

        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }

        // Send the order status information to the frontend
        res.status(200).json({
            status: order.status,
            expectedDeliveryDate: order.expected_delivery_date,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
    try {
        // Check if the requesting user/token is an admin

        const { orderId } = req.params;

        const order = await models.Order.findOne({
            where: { id: orderId },
            attributes: ['id', 'status', 'expected_delivery_date'],
        });

        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
        if (!validStatuses.includes(req.body.status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }
        // Update the order status in the database
        order.status = req.body.status;
        await order.save();

        // Emit an event to notify clients that the order status has been updated
        ioServer.emit('orderStatusUpdated', {
            orderId: order.id,
            status: order.status,
            expectedDeliveryDate: order.expected_delivery_date,
        });

        return res.json({
            message: 'status updated ',
            status: order.status,
            expectedDeliveryDate: order.expected_delivery_date,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
