const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const roomUsers = document.querySelector("#users");
const socket = io();

// getting username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// join chatroom
socket.emit("joinRoom", {
  username,
  room,
});

// Getting room users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputRoomUsers(users);
});

// message from server
socket.on("message", (message) => {
  outputMessage(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // gets message text
  const msg = e.target.elements.msg.value;
  // emits chat message to server
  socket.emit("chatMessage", msg);

  // clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();

  // scolls down to new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// outputs message to DOM
const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  chatMessages.appendChild(div);
};

const outputRoomName = (room) => {
  roomName.innerText = room;
};

const outputRoomUsers = (users) => {
  //   console.log(users);
  roomUsers.innerHTML = "";
  users.forEach((user) => {
    roomUsers.innerHTML += `<li>${user.username}</li>`;
  });
};
