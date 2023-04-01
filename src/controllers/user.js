import { User, UserRole } from '../database/models';
import models from '../database/models';

exports.getProfile = async (req, res) => {
    try {
        const profile = req.user;
        profile.otpcode = undefined;
        profile.otpcodeexpiration = undefined;
        res.status(200).json({
            status: 'success',
            profile,
        });
    } catch (error) {
        res.status(400).json({
            status: 'success',
            message: error.message,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profileObj = {
            ...(req.body.firstName && { firstName: req.body.firstName }),
            ...(req.body.lastName && { lastName: req.body.lastName }),
            ...(req.body.address && { address: req.body.address }),
            ...(req.body.telephone && { telephone: req.body.telephone }),
            ...(req.body.billingAddress && {
                billingAddress: req.body.billingAddress,
            }),
            ...(req.body.preferredLanguage && {
                preferredLanguage: req.body.preferredLanguage,
            }),
            ...(req.body.birthdate && { birthdate: req.body.birthdate }),
            ...(req.body.preferredCurrency && {
                preferredCurrency: req.body.preferredCurrency,
            }),
            ...(req.body.gender && { gender: req.body.gender }),
        };

        const profile = await User.update(profileObj, {
            where: {
                id: req.user.id,
            },

            returning: true,
            plain: true,
            raw: true,
        });

        res.status(200).json({
            status: 'success',
            profile: profile[1],
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            attributes: {
                exclude: ['password', 'otpcode', 'otpcodeexpiration'],
            },
        });

        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: UserRole,
                    as: 'UserRoles',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'userId'],
                    },
                    include: [
                        {
                            model: models.Role,
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
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
