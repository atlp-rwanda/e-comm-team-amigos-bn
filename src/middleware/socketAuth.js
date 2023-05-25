import models from '../database/models';
import verifySocketToken from '../helpers/verifySocketToken';

const socketAuth = async (token) => {
    if (!token) {
        throw new Error('Authentication error: Token missing');
    }

    try {
        const decodedData = await verifySocketToken(token);

        if (!decodedData) {
            throw new Error('Authentication error: Invalid token');
        }

        const user = await models.User.findOne({
            where: { id: decodedData.userId },
        });

        if (!user) {
            throw new Error('Authentication error: User not found');
        }

        return user?.dataValues;
    } catch (error) {
        console.error('Authentication error:', error.message);
        return null;
    }
};

export default socketAuth;
