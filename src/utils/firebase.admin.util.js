const admin = require('firebase-admin');
const serviceAccount = require('./../../e-comm-team-amig-1678127873989-firebase-adminsdk.json');
import models from './../database/models';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://e-comm-team-amig-1678127873989.firebaseio.com',
});

export async function sendNotification(userId, notificationData) {
    // const userDocRef = admin.firestore().collection('users').doc(userId);
    // const userDoc = await userDocRef.get();
    // if (!userDoc.exists) {
    //     console.log(`User with ID ${userId} does not exist`);
    //     // return;
    // }

    let user = await models.User.findAll({ where: { id: userId } });
    user = user[0].toJSON();
    console.log(user);

    const fcmToken = user.fcmToken;
    console.log('Fcm token: ', fcmToken);

    if (!fcmToken) {
        console.log(`User with ID ${userId} does not have an FCM token`);
        return;
    }

    // const message = {
    //     token: fcmToken,
    //     notification: {
    //         title: notificationData.title,
    //         body: notificationData.body,
    //     },
    //     data: {
    //         productId: notificationData.productId,
    //     },
    // };

    const message = {
        // token: 'fbm7oMUqEY4s5GLuUn16FP:APA91bG6Jz3kxKJfQ14jOcc2AshbR__AXCAYFArK4gtR3_ZTgaw0vJSLNvcTv8nBz4OKzWVyTjk-bNIJzML789ir6pCPpIwRd_7PfGY276e8gaD07Bri-9e9DWxVv5U5QK4aF33o0J-G',
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
        const response = await admin.messaging().send(message);
        console.log(`Notification sent to user with ID ${userId}:`, response);
    } catch (error) {
        console.log(
            `Error sending notification to user with ID ${userId}:`,
            error
        );
    }
}
