/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/main.js":
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
/***/ (() => {

eval("const chatForm = document.getElementById('chat-form');\nconst chatMessages = document.querySelector('.chat-messages');\nconst roomName = document.getElementById('room-name');\nconst userList = document.getElementById('users');\n\n// Function to get query parameters from the URL\nfunction getQueryParams() {\n  const queryParams = new URLSearchParams(window.location.search);\n  return {\n    username: queryParams.get('username'),\n    room: queryParams.get('room')\n  };\n}\n\n// Get the username and room from URL query parameters\nconst {\n  username,\n  room\n} = getQueryParams();\nconst socket = io();\n\n//  join chatRoom\nsocket.emit('joinRoom', {\n  username,\n  room\n});\n\n// get room and users\nsocket.on('roomUsers', ({\n  room,\n  users\n}) => {\n  outputRoomName(room);\n  outputUsers(users);\n});\n\n// Message from server\nsocket.on('message', message => {\n  console.log(message);\n  outputMessage(message);\n\n  // scroll down\n  chatMessages.scrollTop = chatMessages.scrollHeight;\n});\n\n// Message submit\nchatForm.addEventListener('submit', e => {\n  e.preventDefault();\n  const msg = e.target.elements.msg.value;\n\n  //Emit the message to the server\n  socket.emit('chatMessage', msg);\n\n  // clear inputs\n  e.target.elements.msg.value = '';\n  e.target.elements.msg.focus();\n});\n\n// output message from server to the dom\nfunction outputMessage(message) {\n  const div = document.createElement('div');\n  div.classList.add('messages');\n  div.innerHTML = ` <p>${message.username} <span class=\"time\">${message.time}</span></p>\n            <p class=\"text\">\n             ${message.text}\n            </p>`;\n  document.querySelector('.chat-messages').appendChild(div);\n}\n\n// Add Room name to DOM\nfunction outputRoomName(room) {\n  roomName.innerText = room;\n}\n\n// Add users to the DOM\nfunction outputUsers(users) {\n  userList.innerHTML = `\n  ${users.map(user => `<li>${user.username}</li>`).join('')}`;\n}\n\n//# sourceURL=webpack://gumzo/./public/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/main.js"]();
/******/ 	
/******/ })()
;