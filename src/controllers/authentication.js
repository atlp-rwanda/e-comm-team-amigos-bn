import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../database/models';
import tokenGenerator from '../helpers/generateToken';
import { sendMail } from '../helpers/sendMail';
import { sendEmailToUser } from '../helpers/sendEmailToUser';
import { createOTP } from '../helpers/createotp';
import { sendResetMail } from '../helpers/sendResetPasswordEmail';
import { transformUserRoles } from '../helpers/transformUserRoles';

dotenv.config();
const createUser = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        telephone: req.body.telephone,
        address: req.body.address,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
    };

    try {
        // Get Roles
        const defaultRole = await models.Role.findOne({
            where: {
                name: 'Customer',
            },
            raw: true,
        });

        const user = await models.User.create(userData);
        // Create Default Role (Customer)
        await models.UserRole.create({
            id: uuidv4(),
            userId: user.dataValues.id,
            roleId: defaultRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const token = tokenGenerator({ userId: user.id }, { expiresIn: '1d' });
        const url = `${process.env.BASE_URL}/user/verify_email/${token}`;
        await sendMail(
            user.email,
            'Email Verification',
            'you can now verify your account',
            url
        );

        return res.status(201).json({
            message: 'Account created successfully',
            data: user,
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const emailVerification = async (req, res) => {
    const { token } = req.params;
    try {
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        const { userId } = decodeToken;
        const user = await models.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.verified) {
            return res.status(400).json({ message: 'Email already verified.' });
        }
        user.verified = true;
        await user.save();
        return res
            .status(200)
            .json({ message: 'Email verified successfully.' });
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: { email: req.body.email },
            include: [
                {
                    model: models.UserRole,
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

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Email or Password Incorrect' });
        }
        if (user.verified === false) {
            return res.json({
                message: 'You have to first verify your account',
            });
        }

        const userRoles = transformUserRoles(user.UserRoles);
        bcrypt.compare(req.body.password, user.password, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (userRoles.includes('Merchant')) {
                    const otp = await createOTP(user);

                    return res
                        .status(200)
                        .json({ message: 'Enter OTP to be be verified', otp });
                }
                const token = jwt.sign(
                    { userId: user.id, userEmail: user.email },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '1h',
                    }
                );
                res.setHeader('Authorization', `Bearer ${token}`);
                return res
                    .status(200)
                    .json({ message: 'User Logged Successfully', token });
            }
            return res
                .status(400)
                .json({ message: 'Email or Password Incorrect' });
        });
    } catch (error) {
        res.json(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const updatePassword = async (req, res) => {
    const { email, oldPass, newPass } = req.body;
    try {
        const user = await models.User.findOne({ where: { email: email } });
        const isMatch = await bcrypt.compare(oldPass, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Incorrect Old Password' });
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPass, salt);
        const updatedUser = await models.User.update(
            {
                password: hashedNewPassword,
            },
            {
                where: { email: email },
            }
        );
        if (updatedUser)
            return res
                .status(200)
                .json({ message: 'Password Updated Successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const checkotp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await models.User.findOne({
            where: { email },
        });

        const currenttime = new Date().getTime();
        const expiredtime = new Date(user.otpcodeexpiration).getTime();
        if (currenttime < expiredtime) {
            bcrypt.compare(otp, user.otpcode, async (err, result) => {
                if (err) throw err;
                if (result) {
                    const token = jwt.sign(
                        { userId: user.id, userRole: user.role },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '1h',
                        }
                    );
                    res.setHeader('Authorization', `Bearer ${token}`);
                    return res
                        .status(200)
                        .json({ message: 'Vendor Logged Successfully', token });
                }
            });
        } else {
            return res
                .status(401)
                .json({ message: 'OTPCODE is expired try again' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const forgotPassword = async (req, res) => {
    const userEmail = req.body.email;
    const userExist = await models.User.findOne({
        where: { email: userEmail },
    });
    if (!userExist) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (userExist.verified == false) {
        res.json({ message: 'Your account is not verified' });
    }
    const token = tokenGenerator(
        { email: userEmail, id: userExist.id },
        { expiresIn: '1d' }
    );
    const link = `${process.env.BASE_URL}/user/resetPassword/${token}`;
    sendResetMail(userEmail, 'Reset password email', 'reset password', link);
    return res.status(200).json({ message: 'email sent successfully' });
};
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken.id;
    const userEmail = decodeToken.email;
    const link = `${process.env.BASE_URL}/user/login`;

    const userExist = await models.User.findOne({ where: { id: userId } });
    if (!userExist) {
        return res.status(404).json({ message: 'user not found' });
    }

    const { password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return res.json({ message: 'password is not matched' });
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    await models.User.update(
        { password: hashedPass },
        { where: { id: userId } }
    );
    sendResetMail(userEmail, ' password updated Email', 'login', link);
    return res.status(200).json({ message: 'password updated successfully' });
};

const disableUser = async (req, res) => {
    const userEmail = req.body.email;
    const reasons = req.body.reason;

    try {
        const user = await models.User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.isDisabled) {
            return res.json({ message: 'User already disabled' });
        }
        user.isDisabled = true;
        await user.save();

        const updateUser = await models.User.update(
            {
                status: 'inactive',
            },
            {
                where: { email: userEmail },
            }
        );
        if (updateUser) {
            sendEmailToUser(
                userEmail,
                'Account disabled',
                `Dear User,<br>\n\nYour account has been blocked bacause of ${reasons}.\n\nPlease contact us if you have any questions.\n\n<br>Best regards,\nThe Admin Team`
            );
            return res.status(200).json({ message: 'User account disabled' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
const enableUser = async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await models.User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if ((user.isDisabled = false)) {
            return res.json({ message: 'User already enabled' });
        }
        user.isDisabled = false;
        await user.save();
        const updateUser = await models.User.update(
            {
                status: 'active',
            },
            {
                where: { email: userEmail },
            }
        );
        if (updateUser) {
            sendEmailToUser(
                userEmail,
                'Account Activation',
                `Dear User,<br>\n\nYour account has been activated successfully!.\n\nPlease contact us if you have any questions.\n\n<br>Best regards,\nThe Admin Team`
            );
            return res.json({ message: 'User account enabled' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('User logged out');
        }
    });
};

export default {
    createUser,
    loginUser,
    emailVerification,
    checkotp,
    resetPassword,
    forgotPassword,
    updatePassword,
    disableUser,
    enableUser,
    logout,
};
