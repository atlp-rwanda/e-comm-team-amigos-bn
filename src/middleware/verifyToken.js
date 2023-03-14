import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.get("auth-token");
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided!" });
    }

    const decodeToken = jwt.verify(authHeader, process.env.SECRET_KEY);

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
