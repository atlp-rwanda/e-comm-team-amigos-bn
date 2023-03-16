import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
import { User, UserRole, Role } from '../database/models';
import { transformUserRoles } from '../helpers/transformUserRoles';

dotenv.config()

const checkGetItem = (req) => {
    return (
        req.originalUrl.endsWith(`/product/${req.params.id}`) &&
        req.method === 'GET'
    )
}

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = await req.get('Authorization')

        if (!authHeader) {
            if (checkGetItem(req)) return next();
            return res
                .status(401)
                .json({ status: 'fail', message: 'No token provided!' });
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            if (checkGetItem(req)) return next()
            return res
                .status(401)
                .json({ error: 'Please provide token first.' })
        }

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY)

        if (decodeToken.errors || !decodeToken) {
            if (checkGetItem(req)) return next()
            return res
                .status(401)
                .json({ error: 'Sorry, we fail to authenticate you.' })
        }

        const { userId } = decodeToken

        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'email', 'otpcode', 'otpcodeexpiration'],
            },
            include: [
                {
                    model: UserRole,
                    as: 'UserRoles',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'userId'],
                    },
                    include: [
                        {
                            model: Role,
                            as: 'Role',
                            attributes: {
                                exclude: [
                                    'createdAt',
                                    'updatedAt',
                                    'id',
                                    'description',
                                ],
                            },
                        },
                    ],
                },
            ],
        });

        if (!user) {
            if (checkGetItem(req)) return next();
            return res.status(401).json({
                status: 'fail',
                message: 'There is no user with token provided.',
            });
        }

        req.user = user.toJSON();
        return next();
    } catch (error) {
        if (checkGetItem(req)) return next()
        return res.status(500).json({ error })
    }
}

export const authorize = (roles) => (req, res, next) => {
    let autherize = false;
    const userRoles = transformUserRoles(req.user.UserRoles);
    autherize = userRoles.some((userRole) => roles.includes(userRole));

    if (autherize) return next();

    return res.status(403).json({
        status: 'fail',
        message:
            'Access denied! You are not allowed to perform this operation.',
    });
};
