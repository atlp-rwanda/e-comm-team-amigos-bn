import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.get('Authorization');
    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided!' });
    }

    const token = authHeader.split(':')[1];
    if (!token) {
      return res.status(401).json({ error: 'Please provide token first.' });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodeToken.errors || !decodeToken) {
      return res
        .status(401)
        .json({ error: 'Sorry, we fail to authenticate you.' });
    }

    req.user = decodeToken;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
