import models from './../database/models';
import jwt from 'jsonwebtoken';

let users = [];

const addNewUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const notifications = (io) => (socket) => {
    console.log("user connected", socket.id);
    socket.on("newUser", (userId)=>{
        const newUser = addNewUser(userId, socket.id);
    })
    socket.on("sendNotification", async({ userId, receiverId, firstName, lastName, title, description }) => {
        await models.Notification.create({
            userId: userId,
            firstName:firstName,
            lastName:lastName,
            title:title,
            body:description
        });
        const receiver = getUser(receiverId);
        if(receiver){
            io.to(receiver?.socketId).emit("getNotification", {
                firstName,
                lastName,
                title,
                description,
              });
        }
      });
    socket.on("disconnect", ()=>{
        removeUser(socket.id);
    });
};

const getNotifications = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        const notification = await models.Notification.findAll({
            where: {
                userId: userId,
            },
        });
        res.status(200).json({
            message: 'Notification retrieved successfully',
            data: {notification},
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error: error.message,
        });
    }
};

export default {
    notifications,
    getNotifications,
};