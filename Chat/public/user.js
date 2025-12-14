const socket = io();
const form = document.getElementById("chat-form");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

// Xác định vai trò
const role = window.location.href.includes("admin") ? "admin" : "user";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  socket.emit("chat message", { msg: input.value, role });
  input.value = "";
});

socket.on("chat message", (data) => {
  const li = document.createElement("li");
  // Tin nhắn của mình (user hiện tại) hiển thị bên phải, tin nhắn của người khác (admin) hiển thị bên trái
  const isMyMessage = data.role === role;
  const messageSide = isMyMessage ? "admin" : "user";
  li.classList.add("message", messageSide);

  // Avatar
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = data.role === "user" ? "U" : "A";

  // Message wrapper
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message-wrapper");

  // Bubble
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = data.msg;

  // Time
  const time = document.createElement("div");
  time.classList.add("message-time");
  const now = new Date();
  const timeString = now.toLocaleTimeString("vi-VN", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
  time.textContent = timeString;

  // Assemble
  messageWrapper.appendChild(bubble);
  messageWrapper.appendChild(time);
  
    li.appendChild(avatar);
  li.appendChild(messageWrapper);

  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
