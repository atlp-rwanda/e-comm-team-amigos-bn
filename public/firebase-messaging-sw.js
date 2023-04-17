importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyAAMvoXCfQ4NjFY6tUTELXG-lQd9OhkMTg',
    authDomain: 'e-comm-team-amig-1678127873989.firebaseapp.com',
    projectId: 'e-comm-team-amig-1678127873989',
    storageBucket: 'e-comm-team-amig-1678127873989.appspot.com',
    messagingSenderId: '513503659466',
    appId: '1:513503659466:web:da5de785bcc746037ebb33',
    measurementId: 'G-Q1B43ESV2N',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationBody = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationBody);
});
