const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// modules
const connectDB = require('./db/connect');
const User = require('./models/userSchema');
const formatMessage = require('./utils/messages');
require('dotenv').config();
const {
  userJoin,
  currentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

// error codes
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('./errors');
const userSchema = require('./models/userSchema');
const checkIfUserExists = require('./middleware/isauthenticated');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
// Register
app.get('/', (req, res) => {
  res.render('register.ejs');
});

app.post('/', checkIfUserExists, async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).redirect('/login');
  // res.json({ user: { username: user.username, room: user.room }, token });
});

// Login
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ username });

  // Authenticate the user
  if (!user) {
    // throw new UnauthenticatedError('Invalid credentials');
    return res.status(StatusCodes.UNAUTHORIZED).render('login.ejs', {
      errorMessage: 'Username does not exist',
    });
  }

  // compare passwords
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError('Invalid credentials');
    return res.status(StatusCodes.UNAUTHORIZED).render('passworderror.ejs', {
      message: 'Password is not correct, try again',
    });
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .redirect(`/chat?username=${user.username}&room=${user.room}`);
  // res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
});

// Chat
app.get('/chat', async (req, res) => {
  const { username, room } = req.query;
  console.log(username);

  res.render('chat', {
    username,
    room,
  });
});

const botName = 'Gumzo Bot';

// connect to the database
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Gumzo!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = currentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
