import { Socket } from 'socket.io';
import models from '../database/models';
import formatMessage from '../helpers/messageHelper';
import socketAuth from '../middleware/socketAuth';

const chat = async (socket) => {
    console.log('connected');
    const { token } = socket.handshake.query;
    const sender = await socketAuth(token);
    socket.on('message', async (msg) => {
        const { userName, id } = sender;
        models.Chat.create({
            content: msg,
            userId: id,
            userName: userName,
        }).then(() => {
            console.log(`New message received: ${msg} by username ${userName}`);
            socket.emit('message', formatMessage(userName, msg));
            socket.broadcast.emit('message', formatMessage(userName, msg));
        });
    });
};

const getChat = async (req, res) => {
    try {
        if (req.query.df) {
            throw new Error('No Parameters required');
        }
        const chats = await models.Chat.findAll();
        return res.status(200).json({ Chats: chats });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error.message });
    }
};

export default {
    getChat,
    chat,
};
