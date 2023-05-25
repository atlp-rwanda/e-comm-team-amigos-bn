import express from 'express';
import notificationController from '../../controllers/notification.controller';
const router = express.Router();

router.get('/notification', notificationController.getNotifications);

export default router;