import jwt from 'jsonwebtoken';
import model from '../database/models';
import generateToken from '../helpers/generateToken';
import dotenv from 'dotenv';
dotenv.config();

export async function successGoogleLogin(req, res) {
    if (!req.user) return res.redirect('/token/auth/callback/failure');

    try {
        const userObj = req.user._json;
        if (userObj.email_verified != true) {
            return res
                .status(401)
                .json({ message: 'Email not verified', error: true });
        }

        const user = await model.User.findOne({
            where: { email: userObj.email },
        });
        if (!user) {
            const googleUser = await model.User.create({
                firstName: userObj.given_name,
                lastName: userObj.family_name,
                email: userObj.email,
            });
            if (googleUser) {
                const token = generateToken({
                    userId: googleUser.id,
                });
                const successUrl =
                    `${process.env.REACT_URL}/success?token=` + token;
                res.redirect(successUrl);
            }
        } else {
            const newUser = user.toJSON();
            const token = generateToken({
                userId: newUser.id,
            });
            const successUrl =
                `${process.env.REACT_URL}/success?token=` + token;
            res.redirect(successUrl);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server issues!', err });
    }
}

export async function failureGogleLogin(req, res) {
    res.status(400).json({ error: 'Could not complete this process' });
}
