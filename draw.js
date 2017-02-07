window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');


  // Create a new WebSocket.
  var socket = new WebSocket('wss://davidkorff.github.io/draw');


  // Handle any errors that occur.
  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };


  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  };


  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
                               message + '</li>';
  };


  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };


  // Send a message when the form is submitted.
  // form.onsubmit = function(e) {
  //   e.preventDefault();
  //
  //   // Retrieve the message from the textarea.
  //   var message = messageField.value;
  //
  //   // Send the message through the WebSocket.
  //   socket.send(message);
  //
  //   // Add the message to the messages list.
  //   messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
  //                             '</li>';
  //
  //   // Clear out the message field.
  //   messageField.value = '';
  //
  //   return false;
  // };


  // Close the WebSocket connection when the close button is clicked.
  // closeBtn.onclick = function(e) {
  //   e.preventDefault();
  //
  //   // Close the WebSocket.
  //   socket.close();
  //
  //   return false;
  // };

};


x=null
y=null
oldX=null
oldY=null
continueDraw=false
color ='blue'

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
   if (x>oldX+10 || x<oldX-10 || y>oldY+10 || y<oldY-10 ){
    oldX=x
    oldY=y
   }
  x=evt.clientX - rect.left
  y=evt.clientY - rect.top
  if (continueDraw===true){
    draw()
  }
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
}, false);

canvas.addEventListener('click', drawListener)

function drawListener(){
  continueDraw=true
  draw()
  canvas.addEventListener('click', toggleDraw);
  canvas.removeEventListener('click', drawListener);
}

function toggleDraw(){
  continueDraw=false
  canvas.addEventListener('click', drawListener)
}

function draw(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath()
  ctx.moveTo(x,y);
  ctx.lineTo(oldX,oldY);
  ctx.lineWidth=5;
  context.strokeStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

}

document.addEventListener('keypress', clearScreen)

function clearScreen(e){
  console.log(e.which)
  if (e.which===99){
    context.clearRect(0, 0, canvas.width, canvas.height)
    toggleDraw()
  }

}
function addCanvas(){
  //debugger
  var canv=document.createElement("myCanvas");
  canv.setAttribute("id", "myCanvas");
  //var c=document.getElementById("canvasID");
}

function removeCanvas(){
  var elem = document.getElementById("myCanvas");
  elem.parentNode.removeChild(elem);
  addCanvas()
}
