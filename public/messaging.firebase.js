import {
    getToken,
    onMessage,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js';
import { messaging } from './firebase.js';

const VAPID_KEY =
    'BG3o3DIPkZK2O15jPLeNQHaLfySBIJSjECF2MbSB8AlniE6sPdn9cINc0BpwHg-Jb8eR1u9p13MYv8fzufq9S_s';

export async function requestNotificationPermission(uid) {
    console.log('Requesting notification permissions...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        await saveMessagingDeviceToken(uid);
    } else {
        console.log('Unable to get permissions to notify...');
    }
}

export async function saveMessagingDeviceToken(uid) {
    const msg = await messaging();
    const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });

    if (fcmToken) {
        console.log('Got fcm token: ', fcmToken);
        const token = { fcmToken: fcmToken };
        await fetch(`/notifications/fcmtoken`, {
            method: 'POST',
            body: JSON.stringify(token),
            headers: new Headers({
                Authorization:
                    'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMWRhN2M0Yy1hNTMwLTRiMGItOTU5Mi1jZGE4NjU3OGVkZGQiLCJpYXQiOjE2ODE0NjYxMzAsImV4cCI6MTY4MTQ2OTczMH0.q_ErDl0eGv2i44WcMStWwam9aLkBeUEOlVmIBsjqEZ8',
                'Content-Type': 'application/json',
            }),
        });

        onMessage(msg, (message) => {
            console.log('foreground message Firebase', message.notification);
            new Notification(message.notification.title, {
                body: message.notification.body,
            });
        });
    } else {
        requestNotificationPermission(uid);
    }
}
