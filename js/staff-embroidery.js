class StaffEmbroidery {
    constructor(options) {
        this.canvas = document.querySelector(options.canvasSelector);
        this.ctx = this.canvas.getContext('2d');
        this.imagePaths = options.imagePaths || [];
        this.currentIndex = 0;
        this.hexSize = options.hexSize || 4; // Radius of hexagon
        this.speed = options.speed || 10; // Hexes per frame

        this.isAnimating = false;
        this.width = 0;
        this.height = 0;

        this.hexGrid = []; // Map of "q,r" -> {q, r, x, y, color}
        this.activeHexes = []; // Hexes to animate
        this.visited = new Set();
        this.frontier = []; // Queue for growth

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
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

        // Fade out old image if exists
        if (this.currentIndex > 0 || this.hexGrid.size > 0) {
            this.ctx.fillStyle = 'rgba(17, 17, 17, 0.9)'; // Dark fade
            this.ctx.fillRect(0, 0, this.width, this.height);
            await new Promise(r => setTimeout(r, 500));
        }

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
                this.displayError("Security Error: Canvas tainted. Please run this via a local server (http://localhost), not file://");
            }
        };
        img.onerror = (e) => {
            console.error("Image Load Error:", e);
            this.displayError(`Failed to load image: ${src}`);
        };
        img.src = src;
    }

    displayError(msg) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '10px';
        div.style.left = '10px';
        div.style.color = 'red';
        div.style.background = 'rgba(0,0,0,0.8)';
        div.style.padding = '10px';
        div.textContent = msg;
        document.body.appendChild(div);
    }

    processImage(img) {
        // Create offscreen canvas to sample data
        const offCanvas = document.createElement('canvas');
        // Fit image into screen maintain aspect ratio
        const scale = Math.min(this.width / img.width, this.height / img.height) * 0.8; // 80% screen size
        const w = img.width * scale;
        const h = img.height * scale;

        offCanvas.width = this.width;
        offCanvas.height = this.height;
        const ctx = offCanvas.getContext('2d');

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
        // width = sqrt(3) * size
        // height = 2 * size
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
                        const color = `rgb(${data[idx]}, ${data[idx + 1]}, ${data[idx + 2]})`;
                        const key = `${q},${r}`;
                        const hex = { q, r, x, y, color };
                        this.hexGrid.set(key, hex);

                        // Pick random seeds for growth
                        if (Math.random() < 0.001) { // 0.1% chance to be a seed
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

        // Process N hexes per frame
        // Dynamically adjust speed based on remaining work?
        // Let's stick to fixed speed for now.

        let processed = 0;
        while (processed < this.speed && this.frontier.length > 0) {
            // Random pick
            const randIdx = Math.floor(Math.random() * this.frontier.length);
            const hex = this.frontier[randIdx];

            // Remove (swap-pop)
            this.frontier[randIdx] = this.frontier[this.frontier.length - 1];
            this.frontier.pop();

            this.drawHex(hex);
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

    drawHex(hex) {
        const ctx = this.ctx;
        ctx.strokeStyle = hex.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        // Simulate a stitch: messy line
        // Random angle offset
        const angle = Math.random() * Math.PI;
        const len = this.hexSize * 0.8;

        ctx.beginPath();
        ctx.moveTo(hex.x - Math.cos(angle) * len, hex.y - Math.sin(angle) * len);
        ctx.lineTo(hex.x + Math.cos(angle) * len, hex.y + Math.sin(angle) * len);
        ctx.stroke();
    }

    addNeighbors(hex) {
        // Neighbors for pointy top offset coords
        // Odd rows shift right
        const directions = hex.r % 2 === 0
            ? [[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]]
            : [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]];

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
