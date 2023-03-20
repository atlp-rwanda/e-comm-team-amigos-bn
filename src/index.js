import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import socketAuth from './middleware/socketAuth';
import chatController from './controllers/chat.controller';

const server = http.createServer(app);
export const io = new Server(server, {
  pingTimeout: 600000,
  cors: {
    origin: 'http://localhost:4000',
  },
});

io.use(socketAuth).on('connection', chatController.chat);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
