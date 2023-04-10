import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/static', express.static('static'));
app.use('/uploads', express.static('uploads'));

import rootRouter from './feature/root/root.router';
import userRouter from './feature/user/user.router';
import listRouter from './feature/list/list.router';
import postRouter from './feature/post/post.router';
import exhibitionRouter from './feature/exhibition/exhibition.router';
import guestRouter from './feature/guest/guest.router';
import imagesRouter from './feature/images/images.router';

app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/list', listRouter);
app.use('/post', postRouter);
app.use('/exhibition', exhibitionRouter);
app.use('/guest', guestRouter);
app.use('/images', imagesRouter);

export default app;
