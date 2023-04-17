const admin = require('firebase-admin')
const firebae_adminsdk = require("../../e-comm-team-amig-1678127873989-firebase-adminsdk.json");
import models from './../database/models';

admin.initializeApp({
    credential: admin.credential.cert(firebae_adminsdk),
    databaseURL: 'https://e-comm-team-amig-1678127873989.firebaseio.com',
});

export async function sendingNotification(userId, notificationData) {
    let user = await models.User.findAll({ where: { id: userId } });
    user = user[0].toJSON();
    const fcmToken = user.fcmToken;
    if (!fcmToken) {
        console.log(`User with ID ${userId} does not have an FCM token`);
        return;
    }
    const message = {
        token: fcmToken,
        notification: {
            title: notificationData.title,
            body: notificationData.body,
        },
        data: {
            productId: notificationData.productId,
        },
    };
    try {
        await admin.messaging().send(message);
        await models.Notification.create({
            fcmToken:fcmToken,
            userId:userId,
            title: notificationData.title,
            body: notificationData.body
        })
    } catch (error) {
        console.log("error:", error);
    }
}
