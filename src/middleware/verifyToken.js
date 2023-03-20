import jwt from 'jsonwebtoken';
import { User } from '../database/models';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.get('Authorization');

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided!" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Please provide token first.' });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodeToken.errors || !decodeToken) {
      return res
        .status(401)
        .json({ error: "Sorry, we fail to authenticate you." });
    }

    const { userId } = decodeToken;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password', 'email'],
      },
      raw: true,
    });

    if (!user)
      return res
        .status(400)
        .json({ status: 'error', message: 'User nolonger exists.' });

    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
