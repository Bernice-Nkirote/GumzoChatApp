const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Function to get query parameters from the URL
function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  return {
    username: queryParams.get('username'),
    room: queryParams.get('room'),
  };
}

// Get the username and room from URL query parameters
const { username, room } = getQueryParams();

const socket = io();

//  join chatRoom
socket.emit('joinRoom', { username, room });

// get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit the message to the server
  socket.emit('chatMessage', msg);

  // clear inputs
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// output message from server to the dom
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('messages');
  div.innerHTML = ` <p>${message.username} <span class="time">${message.time}</span></p>
            <p class="text">
             ${message.text}
            </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Add Room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to the DOM
function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join('')}`;
}
