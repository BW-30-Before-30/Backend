const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');
const bucketlistRouter = require('../list/bucketlist-router.js');
const itemRouter = require('../item/item-router.js');
const commentRouter = require('../comment/comment-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/bucketlists', bucketlistRouter);
server.use('/api/bucketlists', itemRouter);
server.use('/api/comments', commentRouter);

module.exports = server;