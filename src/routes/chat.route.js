import { Router} from 'express'
import getChat from '../controllers/chat.controller'


const chatRouter = Router();

chatRouter.get('/', getChat.getChat);

export default chatRouter


