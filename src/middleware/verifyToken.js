import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { User } from '../database/models';

dotenv.config();

const checkGetItem = (req) => {
    return (
        req.originalUrl.endsWith(`/product/${req.params.id}`) &&
        req.method === 'GET'
    );
};

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = await req.get('Authorization');

        if (!authHeader) {
            if (checkGetItem(req)) return next();
            return res.status(401).json({ error: 'No token provided!' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            if (checkGetItem(req)) return next();
            return res
                .status(401)
                .json({ error: 'Please provide token first.' });
        }

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

        if (decodeToken.errors || !decodeToken) {
            if (checkGetItem(req)) return next();
            return res
                .status(401)
                .json({ error: 'Sorry, we fail to authenticate you.' });
        }

        const { userId } = decodeToken;

        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'email'],
            },
            raw: true,
        });

        if (!user) {
            if (checkGetItem(req)) return next();
            return res
                .status(400)
                .json({ status: 'error', error: 'User does not exist.' })
        }

        req.user = user;
        return next();
    } catch (error) {
        if (checkGetItem(req)) return next();
        return res.status(500).json({ error });
    }
};

export const authorize = (roles) => async (req, res, next) => {
    try {
        const user = req.user;
        const role = user.role;
        if (!roles.includes(role)) {
            return res.status(401).json({
                error: 'Access denied! You are not allowed to perform this operation.',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error });
    }
};
