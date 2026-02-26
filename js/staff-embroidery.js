class StaffEmbroidery {
  constructor(options) {
    this.canvas = document.querySelector(options.canvasSelector);
    this.ctx = this.canvas.getContext("2d");
    this.imagePaths = options.imagePaths || [];
    this.currentIndex = 0;
    this.hexSize = options.hexSize || 6; // Radius of hexagon - Larger for performance & coverage
    this.speed = options.speed || 50; // Beads per frame - Faster for larger beads/area

    this.isAnimating = false;
    this.width = 0;
    this.height = 0;

    this.hexGrid = []; // Map of "q,r" -> {q, r, x, y, color}
    this.activeHexes = []; // Hexes to animate
    this.visited = new Set();
    this.frontier = []; // Queue for growth

    // Earth Tone Bead Palette (Natural Colors)
    this.palette = [
      // Grayscale / Neutrals
      { r: 20, g: 20, b: 20 }, // Black
      { r: 240, g: 240, b: 235 }, // Off-White / Cream
      { r: 169, g: 169, b: 169 }, // Dark Grey
      { r: 210, g: 180, b: 140 }, // Tan

      // Browns
      { r: 139, g: 69, b: 19 }, // Saddle Brown
      { r: 160, g: 82, b: 45 }, // Sienna
      { r: 101, g: 67, b: 33 }, // Dark Brown
      { r: 205, g: 133, b: 63 }, // Peru
      { r: 244, g: 164, b: 96 }, // Sandy Brown

      // Greens (Natural/Olive)
      { r: 85, g: 107, b: 47 }, // Dark Olive Green
      { r: 128, g: 128, b: 0 }, // Olive
      { r: 34, g: 139, b: 34 }, // Forest Green
      { r: 107, g: 142, b: 35 }, // Olive Drab

      // Muted Reds/Oranges/Yellows (Rust/Terracotta)
      { r: 178, g: 34, b: 34 }, // Firebrick (Muted Red)
      { r: 139, g: 0, b: 0 }, // Dark Red
      { r: 218, g: 165, b: 32 }, // Goldenrod
      { r: 184, g: 134, b: 11 }, // Dark Goldenrod
      { r: 210, g: 105, b: 30 }, // Chocolate

      // Blues (Muted/Slate)
      { r: 47, g: 79, b: 79 }, // Dark Slate Gray
      { r: 70, g: 130, b: 180 }, // Steel Blue
      { r: 25, g: 25, b: 112 }, // Midnight Blue
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.loadNextImage();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  async loadNextImage() {
    if (this.imagePaths.length === 0) return;

    // Removed fade out to allow seamless "growth" over previous image
    // if (this.currentIndex > 0 || this.hexGrid.size > 0) { ... }

    const src = this.imagePaths[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;

    const img = new Image();
    // img.crossOrigin = "Anonymous"; // Removed to fix local loading issues
    img.onload = () => {
      try {
        this.processImage(img);
        this.startAnimation();
      } catch (e) {
        console.error("Embroidery Error:", e);
        this.displayError(
          "Security Error: Canvas tainted. Please run this via a local server (http://localhost), not file://",
        );
      }
    };
    img.onerror = (e) => {
      console.error("Image Load Error:", e);
      this.displayError(`Failed to load image: ${src}`);
    };
    img.src = src;
  }

  displayError(msg) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.color = "red";
    div.style.background = "rgba(0,0,0,0.8)";
    div.style.padding = "10px";
    div.textContent = msg;
    document.body.appendChild(div);
  }

  findNearestColor(r, g, b) {
    let minDist = Infinity;
    let bestColor = this.palette[0];

    for (const color of this.palette) {
      // Euclidean distance
      const dr = r - color.r;
      const dg = g - color.g;
      const db = b - color.b;
      const dist = dr * dr + dg * dg + db * db;

      if (dist < minDist) {
        minDist = dist;
        bestColor = color;
      }
    }
    return `rgb(${bestColor.r}, ${bestColor.g}, ${bestColor.b})`;
  }

  processImage(img) {
    // Create offscreen canvas to sample data
    const offCanvas = document.createElement("canvas");
    // Fit image into screen maintain aspect ratio (COVER)
    const scale = Math.max(this.width / img.width, this.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    offCanvas.width = this.width;
    offCanvas.height = this.height;
    const ctx = offCanvas.getContext("2d");

    // Draw centered
    const offsetX = (this.width - w) / 2;
    const offsetY = (this.height - h) / 2;
    ctx.drawImage(img, offsetX, offsetY, w, h);

    const imgData = ctx.getImageData(0, 0, this.width, this.height);
    const data = imgData.data;

    // Generate Hex Grid
    this.hexGrid = new Map();
    this.visited = new Set();
    this.frontier = [];

    // Hex Layout: Pointy topped
    // Tight packing for circles
    const hexW = Math.sqrt(3) * this.hexSize;
    const hexH = 2 * this.hexSize;
    const vertDist = hexH * 0.75;

    const cols = Math.ceil(this.width / hexW);
    const rows = Math.ceil(this.height / vertDist);

    for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {
        // Offset coords
        const x = (q + (r % 2) * 0.5) * hexW;
        const y = r * vertDist;

        // Sample color
        const px = Math.floor(x);
        const py = Math.floor(y);

        if (px >= 0 && px < this.width && py >= 0 && py < this.height) {
          const idx = (py * this.width + px) * 4;
          const alpha = data[idx + 3];

          // Only keep non-transparent pixels
          if (alpha > 20) {
            // Quantize color
            const color = this.findNearestColor(
              data[idx],
              data[idx + 1],
              data[idx + 2],
            );

            const key = `${q},${r}`;
            const hex = { q, r, x, y, color };
            this.hexGrid.set(key, hex);

            // Pick random seeds for growth
            if (Math.random() < 0.001) {
              // 0.1% chance to be a seed
              this.frontier.push(hex);
              this.visited.add(key);
            }
          }
        }
      }
    }

    // If no random seeds hit (small image?), pick center
    if (this.frontier.length === 0 && this.hexGrid.size > 0) {
      const keys = Array.from(this.hexGrid.keys());
      const centerKey = keys[Math.floor(keys.length / 2)];
      this.frontier.push(this.hexGrid.get(centerKey));
      this.visited.add(centerKey);
    }
  }

  startAnimation() {
    // Initial background only on first run if needed
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  animate() {
    if (!this.isAnimating) return;

    let processed = 0;
    while (processed < this.speed && this.frontier.length > 0) {
      // Random pick
      const randIdx = Math.floor(Math.random() * this.frontier.length);
      const hex = this.frontier[randIdx];

      // Remove (swap-pop)
      this.frontier[randIdx] = this.frontier[this.frontier.length - 1];
      this.frontier.pop();

      this.drawBead(hex);
      this.addNeighbors(hex);
      processed++;
    }

    if (this.frontier.length === 0) {
      // Done. Wait then next image
      this.isAnimating = false;
      setTimeout(() => this.loadNextImage(), 3000); // 3s pause to admire
      return;
    }

    requestAnimationFrame(() => this.animate());
  }

  drawBead(hex) {
    const ctx = this.ctx;
    const x = hex.x;
    const y = hex.y;
    const r = this.hexSize; // Use full size for gradient calculation

    // 1. Draw solid base color first so it comes through clearly
    ctx.beginPath();
    // Use 0.9 radius for the actual bead shape to keep slight spacing
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = hex.color;
    ctx.fill();

    // 2. Overlay "Lighting" Gradient (Softened)
    // Light source: Top-Right (matching CodePen style)
    // Geometry: Offset start circle to (x + 0.3r, y - 0.3r)
    const grad = ctx.createRadialGradient(
      x + r * 0.3,
      y - r * 0.3,
      r * 0.1, // Highlight origin
      x,
      y,
      r * 0.9, // Shadow edge
    );

    // Gradient Stops for "Between" Look:
    // 0% - Highlight: Soft White (0.45 opacity - down from 0.8)
    // 50% - Midtone: Transparent (Let base color show)
    // 100% - Shadow: Soft Black (0.35 opacity - down from 0.6)
    grad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
    grad.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.35)");

    ctx.fillStyle = grad;
    ctx.fill();
  }

  addNeighbors(hex) {
    // Neighbors for pointy top offset coords
    // Odd rows shift right
    const directions =
      hex.r % 2 === 0
        ? [
            [1, 0],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
          ]
        : [
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, -1],
          ];

    for (const [dq, dr] of directions) {
      const nq = hex.q + dq;
      const nr = hex.r + dr;
      const key = `${nq},${nr}`;

      if (this.hexGrid.has(key) && !this.visited.has(key)) {
        this.visited.add(key);
        this.frontier.push(this.hexGrid.get(key));
      }
    }
  }
}
