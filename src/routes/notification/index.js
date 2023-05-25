import express from 'express';
import notificationController from '../../controllers/notification.controller';
const router = express.Router();

router.get('/notification', notificationController.getNotifications);
router.get('/notification/mark', notificationController.markNotifications);
export default router;