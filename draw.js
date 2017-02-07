window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  var socket = new WebSocket('https://davidkorff.github.io/draw/');
  socket.onopen = function(event) {
  socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
  socketStatus.className = 'open';
};
}

x=null
y=null
oldX=null
oldY=null
continueDraw=false

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
  ctx.fillStyle = "black";
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
    //removeCanvas()
    //setTimeout(addCanvas, 1000)
    //addCanvas()
    //debugger
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
