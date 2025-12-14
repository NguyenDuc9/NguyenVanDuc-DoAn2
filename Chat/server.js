const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public/admin.html"))
);
app.get("/user", (req, res) =>
  res.sendFile(path.join(__dirname, "public/user.html"))
);

io.on("connection", (socket) => {
  console.log("Người dùng kết nối:", socket.id);

  const room = "room1";
  socket.join(room);

  socket.on("chat message", (data) => {
    io.to(room).emit("chat message", data);
  });

  socket.on("disconnect", () => console.log("Người dùng rời:", socket.id));
});

http.listen(3000, () => console.log("Server chạy http://localhost:3000"));
