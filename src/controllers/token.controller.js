import jwt from "jsonwebtoken";
import model from "./../database/models";

export async function successGoogleLogin(req, res) {
    if (!req.user) return res.redirect("/token/auth/callback/failure");

    try {
        const userObj = req.user._json;
        if (userObj.email_verified != true) return res.status(401).json({ message: "Email not verified", error: true });

        const user = await model.User.findOne({ where: { email: userObj.email } });

        if (!user) res.status(404).json({ user: userObj, message: "sign up" });
        else {
            const newUser = user.dataValues;
            delete newUser.password;
            const token = jwt.sign(newUser, process.env.SECRET_KEY);
            res.status(200).json({
                message: 'success',
                token,
                role: user.role
            });
        }

    } catch (err) {
        res.status(500).json({ error: "Server issues!", err: err });
    }

}

export async function failureGogleLogin(req, res) {
    res.status(400).json({ error: "Could not complete this process" });
}