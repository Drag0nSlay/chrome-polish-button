export default class ChromeTactileButton {
  constructor(elementId, options = {}) {
    this.container = document.querySelector(elementId);
    if (!this.container) return;

    this.config = {
      label: options.label || "PUSH",
      soundSrc: options.soundSrc || "mixkit-metal-tool-drop-835.wav"
    };

    this.highlightX = null;
    this.init();
  }

  init() {
    this.container.classList.add('chrome-btn-container');
    this.container.innerHTML = `
      <canvas class="chrome-canvas"></canvas>
      <div class="chrome-label">${this.config.label}</div>
      <div class="chrome-fingerprint"></div>
      <div class="chrome-hit-line"></div>
    `;

    this.canvas = this.container.querySelector('.chrome-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.hitLine = this.container.querySelector('.chrome-hit-line');
    this.fingerprint = this.container.querySelector('.chrome-fingerprint');
    
    this.canvas.width = 320;
    this.canvas.height = 140;

    this.audio = new Audio(this.config.soundSrc);
    this.video = document.createElement("video");
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('muted', '');
    this.video.setAttribute('playsinline', '');

    this.startCamera();
    this.bindEvents();
    this.animate();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      this.video.srcObject = stream;
      await this.video.play();
    } catch (e) { console.warn("Camera failed", e); }
  }

  bindEvents() {
    const getCoords = (e) => {
      const r = this.container.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      return { x, y };
    };

    this.container.addEventListener("pointermove", (e) => { 
      this.highlightX = getCoords(e).x; 
    });

    this.container.addEventListener("pointerdown", (e) => {
      this.container.classList.add('is-pressed');
      this.audio.currentTime = 0;
      this.audio.play().catch(()=>{});

      const { x, y } = getCoords(e);

      this.hitLine.style.left = `${x}px`;
      this.hitLine.classList.remove('active');
      void this.hitLine.offsetWidth;
      this.hitLine.classList.add('active');

      this.fingerprint.style.left = `${x}px`;
      this.fingerprint.style.top = `${y}px`;
      
      this.container.classList.remove('animating-fp');
      void this.container.offsetWidth; 
      this.container.classList.add('animating-fp');
    });

    const release = () => this.container.classList.remove('is-pressed');
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  }

  draw() {
    const { ctx, canvas, video, highlightX } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.filter = "blur(3px) contrast(1.2) brightness(1.1) saturate(1.3)";
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (highlightX !== null) {
      const p = highlightX / canvas.width;
      const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(p, "rgba(255,255,255,0.7)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}