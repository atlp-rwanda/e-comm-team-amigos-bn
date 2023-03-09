import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (payload = {}, expiresIn = { expiresIn: '1d' }) => {
  let isValidPayload = true;
  if (typeof payload === 'number') {
    isValidPayload = false;
  } else if (typeof payload === 'null') {
    isValidPayload = false;
  } else if (typeof payload === 'object' && !Object.keys(payload).length) {
    isValidPayload = false;
  }
  return isValidPayload
    ? jwt.sign(payload, process.env.SECRET_KEY, expiresIn)
    : null;
};
