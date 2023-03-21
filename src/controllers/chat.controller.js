import { Socket } from "socket.io";
import models from "../database/models";
import formatMessage from "../helpers/messageHelper";

const chat = async(socket) => {
    socket.on("message", async(msg) => {
        const { userName, id} = socket.data.user;
        models.Chat.create({content: msg, userId: id}).then(() => {
            console.log(`New message received: ${msg} by username ${userName}`);
            socket.broadcast.emit('message', formatMessage(userName,msg));
        })
    })
}

const getChat = async(req,res) => {
    try {
        if (req.query.df) {
            throw new Error("No Parameters required");
        }
        const chats = await models.Chat.findAll()
        return res.status(200).json({"Chats": chats});
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

export default {
    getChat,
    chat
}
