import models from '../database/models';

export const checkExpiredPassword = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'User does not exist',
            });
        } else {
            if (new Date() >= user.dataValues.passwordResetTime) {
                return res.status(400).json({
                    error: 'Update your password it has been expired',
                });
            } else {
                return next();
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
