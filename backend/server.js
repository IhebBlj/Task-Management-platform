const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const eventRoutes = require("./routes/eventRoutes");

const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes"); 
const {registerUser}=require("./controllers/userControllers")
const Request =require("./models/request");
dotenv.config();
connectDB();
const app = express();

const corsOptions ={
    origin:`http://localhost:${PORT_S}`, 
    credentials:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API Running!");
});
app.get("try", (req, res) => {
  res.send("try Running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/event",eventRoutes);
app.use(notFound);
app.use(errorHandler);



const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: `http://localhost:${PORT_S}`,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
