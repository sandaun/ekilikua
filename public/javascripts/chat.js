const socket = io();

// DOM elements
const message = document.getElementById('message');
const username = document.getElementById('username');
const useravatar = document.getElementById('useravatar');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {

  socket.emit('chat:message', {
    username: username.value,
    useravatar: useravatar.value,
    message: message.value,
  });
});

socket.on('chat:message', (msg) => {
  output.innerHTML += 
    if (msg.username === currentUser.name) {
      `<div class="d-flex justify-content-end mb-4">
        <div class="msg-cotainer-send"><strong>${msg.username}</strong>: ${msg.message}</div>
        <div class="img-cont-msg">
          <img src="${useravatar.innerHTML}" class="rounded-circle user-img-msg">
        </div>
      </div>`
    } else {
      `<div class="d-flex justify-content-start mb-4">
        <div class="img-cont-msg">
          <img src="/images/login.jpg" class="rounded-circle user-img-msg">
        </div>
        <div class="msg-cotainer">
          <div class="msg-cotainer-send"><strong>${msg.username}</strong>: ${msg.message}</div>
          <span class="msg-time">8:40 AM, Today</span>
        </div>
      </div>`
    };
  // message.innerHTML = "";
});
