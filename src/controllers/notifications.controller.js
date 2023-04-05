import models from './../database/models';

export function clearNotifications(req, res) {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export function clearNotificationById(req, res) {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export function getUnreadNotifications(req, res) {
    try {
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function saveFCMToken(req, res) {
    try {
        const token = req.body.fcmToken;
        // console.log('fcmtoken: ', token, req.body);
        const userId = req.user.id;

        const user = await models.User.findByPk(userId);
        user.fcmToken = token;
        await user.save();
        res.status(200).json({ message: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
