const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
const heroSection = document.querySelector(".about-hero");

let particles = [];
let animationId;

// Configuration - Read from CSS variables
const style = getComputedStyle(document.documentElement);
const particleColor =
  style.getPropertyValue("--particle-color").trim() || "rgba(0, 0, 0, 0.5)";
const lineColor =
  style.getPropertyValue("--particle-line-color").trim() ||
  "rgba(0, 0, 0, 0.15)";
const particleCount = 180; // Increased from 100 to 180 for more density
const connectionDistance = 180; // Increased from 150 to 180 for more connections
const mouseDistance = 250; // Increased interaction radius

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

window.addEventListener("mouseleave", function () {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1; // Velocity X
    this.vy = (Math.random() - 0.5) * 1; // Velocity Y
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse interaction (repel)
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouseDistance;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 3;
        const directionY = forceDirectionY * force * 3;

        this.x -= directionX;
        this.y -= directionY;
      }
    }
  }

  draw() {
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Draw connections
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  animationId = requestAnimationFrame(animate);
}

function resizeCanvas() {
  if (heroSection) {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  init();
}

window.addEventListener("resize", function () {
  resizeCanvas();
});

// Start
console.log("Initializing Particle Network");
resizeCanvas();
animate();
