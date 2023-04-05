const admin = require('firebase-admin');

import {expect} from 'chai';
import { sendingNotification } from '../utils/firebase.admin.util';

describe('sendingNotification', () => {
  it('should send notification successfully', async () => {
    const userId = 'user123';
    const notificationData = {
      title: 'New Notification',
      body: 'You have a new notification',
      productId: 'product123',
    };
    await expect(sendingNotification(userId, notificationData));
  });

  it('should handle user without FCM token', async () => {
    const userId = 'user456';
    const notificationData = {
      title: 'New Notification',
      body: 'You have a new notification',
      productId: 'product456',
    };
    await expect(sendingNotification(userId, notificationData));
  });

  it('should handle error while sending notification', async () => {
    const userId = 'user789';
    const notificationData = {
      title: 'New Notification',
      body: 'You have a new notification',
      productId: 'product789',
    };

    admin.messaging().send = () => {
      throw new Error('Unable to send notification');
    };
    await expect(sendingNotification(userId, notificationData));
  });
});
