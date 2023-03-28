// Import the necessary modules
import models from '../database/models';
import jwt from 'jsonwebtoken';
import socketIo from 'socket.io';
import http from 'http';
import app from '../app';

const ioServer = socketIo(server);
const server = http.createServer(app);

export const createOrder = async (req, res, next) => {
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
};
// Retrieve order status information
export const getOrderStatus = async (req, res, next) => {
  try {
        const {orderId} = req.params


    // Retrieve the order status information from the database
    const order = await models.Order.findOne({
        where: {
          id: orderId
        },
        attributes: ['id', 'status', 'expected_delivery_date'],
      });
    
      if (!order) {
        return res.status(404).send({ message: 'Order not found' });
      }

    // Send the order status information to the frontend
     res.status(200).json({ status: order.status, expectedDeliveryDate: order.expected_delivery_date });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:err.message,
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    // Check if the requesting user/token is an admin


    const {orderId} = req.params


    const order = await models.Order.findOne({
        where: {id: orderId},
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
  ioServer.emit('orderStatusUpdated', { orderId: order.id, status: order.status, expectedDeliveryDate: order.expected_delivery_date });

  return res.json({ message:"status updated ",status: order.status, expectedDeliveryDate: order.expected_delivery_date });

  } catch (err) {
    res.status(500).json({
      success: false,
      message:err.message,
    });
  }
};
module.exports= {
    getOrderStatus,
    updateOrderStatus,
    createOrder
}