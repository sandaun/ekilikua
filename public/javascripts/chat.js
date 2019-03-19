// Declared on assejts.js to be global to map too
// const socket = io();

// DOM elements
// PASS OBJECTS BETWEEN EJS AND JS SCRIPTS
const user = JSON.parse($('#currentUser').text());
$('#currentUser').remove();
// const username = document.getElementById('username');
// const useravatar = document.getElementById('useravatar');
const message = document.getElementById('message');

const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {
  socket.emit('chat:message', {
    user,
    message: message.value,
  });
  message.value = '';
});

// socket.on('chat:message', (msg) => {
//   output.innerHTML += 
//     `<div class="d-flex justify-content-end mb-4">
//       <div class="msg-cotainer-send"><strong>${msg.user.name}</strong>: ${msg.message}</div>
//       <div class="img-cont-msg">
//         <img src="${msg.user.avatar}" class="rounded-circle user-img-msg">
//       </div>
//     </div>`;
//   // message.innerHTML = "";
// });


socket.on('chat:message', (msg) => {
  if (msg.user.name === user.name) { 
    output.innerHTML += 
      `<div class="d-flex justify-content-end mb-4">
        <div class="msg-cotainer-send">
          <strong>${msg.user.name}</strong>: ${msg.message}
          <span class="msg-time-send">8:40 AM, Today</span>
        </div>
        <div class="img-cont-msg">
          <img src="${msg.user.avatar}" class="rounded-circle user-img-msg">
        </div>
      </div>`;
  } else {
    output.innerHTML += 
      `<div class="d-flex justify-content-start mb-4">
        <div class="img-cont-msg">
          <img src="${msg.user.avatar}" class="rounded-circle user-img-msg">
        </div>
        <div class="msg-cotainer">
          <strong>${msg.user.name}</strong>: ${msg.message}
          <span class="msg-time">8:40 AM, Today</span>
        </div>
      </div>`;
  }
});
