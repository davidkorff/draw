x=null
y=null
oldX=null
oldY=null
continueDraw=false
color ='blue'
canvas = document.getElementById('myCanvas')
ctx = canvas.getContext('2d')



canvas.addEventListener('mousemove', function(event) {
  getMousePos(canvas, event)
})

function getMousePos(canvas, event) {
    oldX=x
    oldY=y
    var rect = canvas.getBoundingClientRect()
    x=event.clientX - rect.left
    y=event.clientY - rect.top
    if (continueDraw===true){
      draw()
    }
}

canvas.addEventListener('mousedown', function() { continueDraw=true })
document.addEventListener('mouseup', function() { continueDraw=false })

function draw(){
  ctx.beginPath()
  ctx.moveTo(x,y)
  ctx.lineTo(oldX,oldY)
  ctx.lineWidth=5
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.closePath()
}

document.addEventListener('keypress', clearScreen)

function clearScreen(e){
  console.log(e.which)
  if (e.which===99){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    continueDraw = false
  }
}
