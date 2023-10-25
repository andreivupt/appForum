const express         = require('express');
const userRouter      = require('./routes/usersRouter');
const loginRouter     = require('./routes/loginRouter');
const postRouter      = require('./routes/postsRouter');
const commentRouter   = require('./routes/commentsRouter');
const reactionsRouter = require('./routes/reactionsRouter');
const cors            = require('cors');
const app             = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '\\public'));
app.set('port', process.env.PORT);
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', reactionsRouter);

module.exports = app;