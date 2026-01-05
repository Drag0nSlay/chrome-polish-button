const canvas = document.getElementById("chrome")
const ctx = canvas.getContext("2d")
const btn = document.getElementById("chrome-btn")
const hitLine = document.getElementById("hit-line")
const metalSound = document.getElementById("metal-sound")

canvas.width = 320
canvas.height = 140

const video = document.createElement("video")
video.playsInline = true

let highlightX = null

navigator.mediaDevices.getUserMedia({ video:{ facingMode:"user" } })
  .then(stream => { video.srcObject = stream; video.play(); })

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height)

  ctx.save()
  ctx.globalAlpha = 0.55
  ctx.filter = "blur(2px) contrast(1.15) brightness(1.1)"
  ctx.scale(-1,1)
  ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
  ctx.restore()

  if(highlightX !== null){
    const p = highlightX / canvas.width
    const g = ctx.createLinearGradient(0,0,canvas.width,0)
    g.addColorStop(0,"rgba(255,255,255,.12)")
    g.addColorStop(p,"rgba(255,255,255,.85)")
    g.addColorStop(1,"rgba(255,255,255,.12)")
    ctx.fillStyle = g
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
}

/* Mouse & touch */
canvas.addEventListener("mousemove", e=>{
  const r = canvas.getBoundingClientRect()
  highlightX = e.clientX - r.left
})
canvas.addEventListener("touchmove", e=>{
  const r = canvas.getBoundingClientRect()
  highlightX = e.touches[0].clientX - r.left
})
canvas.addEventListener("mouseleave", ()=>{ highlightX=null })
canvas.addEventListener("touchend", ()=>{ highlightX=null })

/* Hit-line + button press effect + metallic sound */
btn.addEventListener("pointerdown", e=>{
  // Play metallic sound
  metalSound.currentTime = 0
  metalSound.play()

  const r = btn.getBoundingClientRect()
  const x = e.clientX - r.left

  hitLine.style.left = `${x}px`
  hitLine.style.display = "block"
  hitLine.classList.remove("active")
  void hitLine.offsetWidth
  hitLine.classList.add("active")
  setTimeout(()=>{ hitLine.classList.remove("active"); hitLine.style.display="none"; },500)

  btn.classList.remove("active")
  void btn.offsetWidth
  btn.classList.add("active")
})

btn.addEventListener("pointerup", ()=>{ setTimeout(()=>btn.classList.remove("active"),2200) })

/* Animation loop */
function animate(){ draw(); requestAnimationFrame(animate) }
animate()
