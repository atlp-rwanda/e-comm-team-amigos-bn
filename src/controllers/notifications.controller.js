import models from './../database/models';
export async function saveFCMToken(req, res) {
    try {
        const token = req.body.fcmToken;
        const userId = req.user.id;
        const user = await models.User.findByPk(userId);
        user.fcmToken = token;
        await user.save();
        res.status(200).json({ message: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
