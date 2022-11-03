const socket = io();

const chatForm = document.getElementById("sendMsgForm");
const msgInput = document.getElementById("msgInput");
const chatBox = document.querySelector(".chatBox");
const roomName = document.getElementById("roomName");
const userList = document.getElementById("users");
const userNum = document.getElementById("userNum");

// Get the username and room by QS from URL

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//Join ChatRoom
socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputRoomUsers(users);
});

//Get message from server
socket.on("message", (data) => {
  console.log(data);
  outputMessage(data);

  //Scroll down on overflow of new msgs
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Message sent
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Get message text
  const msg = msgInput.value;

  if (msg) {
    //Clear and focus on the input box
    msgInput.value = "";
    msgInput.focus();

    //Emit message to server
    socket.emit("chatMessage", msg);
  }
});

//outputMessage function to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("msgContainer");
  div.innerHTML = `<div class="msgInfo">
    <div class="msgUser">${message.username}</div>
    <div class="time">${message.time}</div>
    </div>
    <p class="msg">${message.msg}</p>`;
  chatBox.appendChild(div);
}

//outputRoomName function for DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

//outputRoomUsers function for DOM
function outputRoomUsers(users) {
  userList.innerHTML = "";
  userNum.innerText = `(${users.length})`;
  for (let i = 0; i < users.length; i++)
    userList.innerHTML += `<li class='userNames'>${users[i].username}</li>`;

  //Adding active class to current user in user list
  socket.on("activeUser", (user) => {
    var listItems = document.getElementsByTagName("li");
    var searchText = user.username;
    var found;

    for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].textContent == searchText) {
        found = listItems[i];
        break;
      }
    }
    found.classList.add("active");
  });
}
