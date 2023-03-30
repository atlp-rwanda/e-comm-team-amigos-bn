import express from  'express';
import { createOrder } from '../controllers/order.controller';
import { verifyToken, authorize } from '../middleware/verifyToken';
import orderController from '../controllers/order.controller';

const router = express.Router();

router.post('/', verifyToken, createOrder);

// Import the order controller


// Retrieve order status information
router.get('/orderStatus/:orderId',verifyToken, authorize(["normal"]), orderController.getOrderStatus);

// Update order status
router.put('/orderStatus/:orderId',verifyToken, authorize(["admin"]), orderController.updateOrderStatus);

module.exports = router;
