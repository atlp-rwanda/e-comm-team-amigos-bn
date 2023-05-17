import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cron from 'node-cron';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './docs';
import routes from './routes';
import db from './database/models';
import tokenRoute from './routes/token.routes';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cartRoute from './routes/cart.routes';
import webhook from './routes/webhook';
const socketIo = require('socket.io');

import http from 'http';
import { Server } from 'socket.io';
import { checkExpiredProducts } from './controllers/product.controller';
import { checkExpiredPassword } from './middleware/checkExpiredPassword';
dotenv.config();

const server = http.createServer(app);
const ioServer = socketIo(server);
const app = express();
app.use(cors());
app.use(express.json());

cron.schedule('0 0 * * *', () => {
    checkExpiredProducts(); // Call your function to check for expired products
});

console.log('Cron job started');
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

export const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:4000'],
        methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
    },
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: 'google-auth-session',
        keys: ['key1', 'key2'],
    })
);


app.use(
    '/cart',
    cookieSession({
        name: 'session',
        keys: [process.env.SECRET_KEY],
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());

app.use('/cart', cartRoute);
app.use('/token', tokenRoute);

app.use('/', routes);
app.use('/',webhook);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
    res.send('Hello, There! this is Amigos ecommerce team project.');
});

export default app;
