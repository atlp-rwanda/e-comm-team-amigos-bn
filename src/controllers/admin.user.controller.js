import { User } from '../database/models'
import { sendMail } from '../helpers/sendMail'
import bcrypt from 'bcryptjs'
import tokenGenerator from '../helpers/generateToken'

export const createUser = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        telephone: req.body.telephone,
        address: req.body.address,
        role: req.body.role,
        gender: req.body.gender,
        preferredLanguage: req.body.language,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
    }
    try {
        const user = await User.create(userData)
        const token = tokenGenerator(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            { expiresIn: '1d' }
        )
        const url = `${process.env.BASE_URL}/user/verify_email/${token}`
        sendMail(
            user.email,
            'Email Verification',
            'you can now verify your account',
            url
        )
        res.status(201).json({
            message: 'Account created successfully',
            data: user,
            token,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ['password', 'otpcode', 'otpcodeexpiration'],
            },
            raw: true,
        })
        if (!user) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'User does not exist',
            })
        } else {
            return res.status(200).json({
                status: 'success',
                user,
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            res.status(404).json({
                status: 'Not Found',
                error: 'User does not exist',
            })
        } else {
            const userUpdate = {
                ...(req.body.firstName && {
                    firstName: req.body.firstName,
                }),
                ...(req.body.lastName && { lastName: req.body.lastName }),
                ...(req.body.userName && { userName: req.body.userName }),
                ...(req.body.address && { address: req.body.address }),
                ...(req.body.telephone && {
                    telephone: req.body.telephone,
                }),
                ...(req.body.email && {
                    email: req.body.email,
                }),
                ...(req.body.billingAddress && {
                    billingAddress: req.body.billingAddress,
                }),
                ...(req.body.preferredLanguage && {
                    preferredLanguage: req.body.preferredLanguage,
                }),
                ...(req.body.birthdate && {
                    birthdate: req.body.birthdate,
                }),
                ...(req.body.preferredCurrency && {
                    preferredCurrency: req.body.preferredCurrency,
                }),
                ...(req.body.gender && { gender: req.body.gender }),
            }

            const updatedUser = await User.update(userUpdate, {
                where: { id: user.id },
                attributes: {
                    exclude: [
                        'password',
                        'otpcode',
                        'otpcodeexpiration',
                        'status',
                        'verified',
                    ],
                },
                raw: true,
            })
            res.status(200).json({
                status: 'OK',
                Message: 'User successifully Updated',
                updatedUser,
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            res.status(404).json({
                status: 'Not Found',
                error: 'User does not exist',
            })
        } else {
            await User.destroy({ where: { id: user.id } })
            res.status(200).json({
                status: 'OK',
                Message: 'User successifully Deleted',
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}

export default {
    createUser,
    getUser,
    updateProfile,
    deleteUser,
}
