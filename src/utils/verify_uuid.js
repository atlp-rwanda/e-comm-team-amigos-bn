const { validate } = require('uuid');

export const verifyUuid = (uid) => {
  return validate(uid);
};
