import { Socket } from 'socket.io';
import models from '../database/models';
import verifySocketToken from '../helpers/verifySocketToken';

const socketAuth = async (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decodedData = await verifySocketToken(
      socket.handshake.query.token
    );
    const user = await models.User.findOne({
      where: { id: decodedData.userId },
    });
    socket.data.user = user?.dataValues;
    next();
  } else {
    next(new Error('Authentication error'));
  }
};

export default {
  socketAuth,
};
