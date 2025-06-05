import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors()); // 允許跨域

const server = http.createServer(app);

const io = new Server(server, {
  path: "/ws/llm",
  cors: {
    origin: "http://localhost:5173", // Vue 前端的 origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("💡 a user connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("📩 message:", msg);
    io.emit("chat message", msg); // 廣播給所有人
  });

  socket.on("disconnect", () => {
    console.log("🔌 user disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO Server Running");
});

server.listen(3000, () => {
  console.log("✅ Socket.IO server running at http://localhost:3000");
});
