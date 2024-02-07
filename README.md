# Gumzo Chat App

Gumzo is a real-time chat application built with Socket.IO, Node.js, and MongoDB. It allows users to register, login, and join chat rooms where they can exchange messages with each other.

## Features

- **User Registration**: Users can register with a username and password.
- **User Authentication**: Login functionality is provided with username and password verification.
- **Real-time Chat**: Users can join chat rooms and exchange messages in real-time.
- **Dynamic Room Creation**: Users can create and join different chat rooms.

## Technologies Used

- **Node.js**: Backend server is built with Node.js to handle server-side logic.
- **Express.js**: Express is used as the web application framework for Node.js.
- **Socket.IO**: Socket.IO enables real-time, bidirectional communication between web clients and servers.
- **MongoDB**: MongoDB is used as the database to store user information and chat messages.
- **Mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS**: EJS (Embedded JavaScript) is used as the templating engine to generate dynamic HTML content.
- **Bootstrap and CSS**: Used for styling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bernice-Nkirote/GumzoChatApp.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environmental dependencies
   - Create a  `.env` file in the directory and add the following variables
     ```
     MONGO_URI=your-mongodb-uri
     PORT=3000
6. Run the server
   ```bash
   npm start
   ```


## Usage
1. Register a new account by visiting the homepage.
2. Login with your registered username and password.
3. Start chatting by joining or creating a chat room.
4. Enjoy real-time communication with other users!

## Credits
This project was created by Bernice Nkirote 

