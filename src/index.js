import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import chatController from './controllers/chat.controller';
import notificationController from './controllers/notification.controller';

const server = http.createServer(app);
export const io = new Server(server, {
    pingTimeout: 600000,
    cors: {
        origin: '*',
    },
});
io.on('connection', chatController.chat);
io.on('connection', notificationController)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});