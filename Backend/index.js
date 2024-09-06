const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connect");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 6000;
const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Routes
const userRoutes = require("./routes/user");
const evacuationRoutes = require("./routes/evacuation");
const chatRoutes = require("./routes/chat");
app.use("/dmsapi/user", userRoutes);
app.use("/dmsapi/evacuation", evacuationRoutes);
app.use("/dmsapi/chat", chatRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "This is a test endpoint" });
});

// Create HTTP server and Socket.IO server
const httpServer = createServer(app); // Pass Express app to HTTP server

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (group) => {
    socket.join(group);
    console.log("User joined room " + group);
  });

  socket.on("new message", (newMessageReceived) => {
    const messageLength = newMessageReceived.data.addMessage.messages.length;

    console.log(
      "Message:",
      newMessageReceived.data.addMessage.messages[messageLength - 1]
    );
    console.log("Group ID:", newMessageReceived.data.addMessage._id);
    socket.broadcast
      .to(newMessageReceived.data.addMessage._id)
      .emit(
        "message received",
        newMessageReceived.data.addMessage.messages[messageLength - 1]
      );
  });
});

// Start HTTP server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB or any other database
    httpServer.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();
