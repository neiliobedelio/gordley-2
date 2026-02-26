const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");
const heroSection = document.querySelector(".scroll-sequence-hero");

// Image Sequence Configuration
const frameCount = 60;
const currentFrame = (index) =>
  `assets/hero-sequence/eyes${index.toString().padStart(4, "0")}.jpg`;

const images = [];
const imageParticles = {
  frame: 0,
};

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas with image for the frame
const updateImage = (index) => {
  // Ensure image is loaded before drawing
  if (images[index].complete) {
    // Draw image covering the canvas (object-fit: cover equivalent)
    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetY = 0;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  } else {
    images[index].onload = () => updateImage(index);
  }
};

// Scroll handler
window.addEventListener("scroll", () => {
  if (!heroSection) return;

  const scrollTop = window.scrollY;
  const sectionTop = heroSection.offsetTop;
  const sectionHeight = heroSection.offsetHeight;
  const windowHeight = window.innerHeight;

  // Calculate progress through the section
  // We want the animation to be fully played by the time we scroll past the sticky area
  // The section is tall (e.g. 300vh), and the sticky part is 100vh.
  // So the scrollable distance is (sectionHeight - windowHeight).

  // Start tracking when section enters viewport (or is at top)
  const scrollDistance = scrollTop - sectionTop;
  const maxScroll = sectionHeight - windowHeight;

  let scrollFraction = scrollDistance / maxScroll;

  // Clamp between 0 and 1
  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * (frameCount - 1)),
  );

  requestAnimationFrame(() => updateImage(frameIndex));
});

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Redraw current frame
  // We need to recalculate frame based on current scroll
  const scrollTop = window.scrollY;
  const sectionHeight = heroSection.offsetHeight;
  const windowHeight = window.innerHeight;
  const maxScroll = sectionHeight - windowHeight;
  let scrollFraction = scrollTop / maxScroll;
  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * (frameCount - 1)),
  );
  updateImage(frameIndex);
});

// Initial draw
images[0].onload = () => updateImage(0);
// If already loaded (cached)
if (images[0].complete) updateImage(0);
