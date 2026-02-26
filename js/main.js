// Initialize Animate On Scroll (AOS)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }

  // Accordion Slideshow Logic
  const accordionPanels = document.querySelectorAll(".accordion-panel");

  accordionPanels.forEach((panel) => {
    panel.addEventListener("click", () => {
      // Remove active class from all panels
      accordionPanels.forEach((p) => p.classList.remove("active"));
      // Add active class to clicked panel
      panel.classList.add("active");
    });
  });

  // --- Interactive Water Ripple Effect ---
  if (typeof $ !== "undefined" && $.fn.ripples) {
    $(".ripple-hero").ripples({
      resolution: 512,
      dropRadius: 20, // size of the ripple
      perturbance: 0.04, // amount of refraction/water effect
      interactive: true,
    });

    // Optionally trigger a splash to indicate it's interactive
    setTimeout(() => {
      const $el = $(".ripple-hero");
      if ($el.length) {
        const x = $el.width() / 2;
        const y = $el.height() / 2;
        $el.ripples("drop", x, y, 30, 0.05);
      }
    }, 1000);
  }
});

// Header logic (hamburger, mobile menu, scroll effect) is now handled by header-component.js

// Video Modal
const watchReelBtn = document.getElementById("watch-reel-btn");
const videoModal = document.getElementById("video-modal");
const closeModalBtn = document.getElementById("close-modal");

watchReelBtn.addEventListener("click", () => {
  videoModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
});

closeModalBtn.addEventListener("click", () => {
  videoModal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
});

// Close modal when clicking outside content
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Scroll to Top logic is now handled in footer-component.js

// Process Section Tabs & Slideshow
const processTabs = document.querySelectorAll(".process-tab");
const processSlides = document.querySelectorAll(".process-slide");
const processContainer = document.querySelector(".process-container");
let currentProcessIndex = 0;
let processInterval;

function switchProcessTab(index) {
  // Remove active class from all
  processTabs.forEach((tab) => tab.classList.remove("active"));
  processSlides.forEach((slide) => slide.classList.remove("active"));

  // Add active class to current
  processTabs[index].classList.add("active");
  processSlides[index].classList.add("active");

  currentProcessIndex = index;
}

// Event Listeners for Tabs
processTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    switchProcessTab(index);
    resetProcessInterval(); // Reset timer on manual interaction
  });
});

// Auto Rotation
function startProcessInterval() {
  processInterval = setInterval(() => {
    const nextIndex = (currentProcessIndex + 1) % processTabs.length;
    switchProcessTab(nextIndex);
  }, 5000); // Switch every 5 seconds
}

function resetProcessInterval() {
  clearInterval(processInterval);
  startProcessInterval();
}

// Pause on hover
if (processContainer) {
  processContainer.addEventListener("mouseenter", () => {
    clearInterval(processInterval);
  });

  processContainer.addEventListener("mouseleave", () => {
    startProcessInterval();
  });

  // Start the slideshow
  startProcessInterval();
}

// --- Testimonials Drag Slider & Custom Cursor ---
const testimonialsSlider = document.getElementById("testimonials-slider");
const dragCursor = document.getElementById("drag-cursor");
const dragArrow = dragCursor ? dragCursor.querySelector(".drag-arrow") : null;

if (testimonialsSlider && dragCursor) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // Custom Cursor Tracking
  const testimonialsSection = document.querySelector(".testimonials-section");

  testimonialsSection.addEventListener("mousemove", (e) => {
    // Move cursor to mouse position
    dragCursor.style.left = e.clientX + "px";
    dragCursor.style.top = e.clientY + "px";

    // Flip arrow based on which half of the screen we are on
    const screenMiddle = window.innerWidth / 2;
    if (e.clientX < screenMiddle) {
      dragArrow.classList.add("flip"); // Point left
    } else {
      dragArrow.classList.remove("flip"); // Point right
    }
  });

  testimonialsSection.addEventListener("mouseenter", () => {
    dragCursor.classList.add("visible");
    testimonialsSection.classList.add("custom-cursor-active");
  });

  testimonialsSection.addEventListener("mouseleave", () => {
    dragCursor.classList.remove("visible");
    testimonialsSection.classList.remove("custom-cursor-active");
  });

  // Click to Scroll Logic
  testimonialsSlider.addEventListener("click", (e) => {
    // Prevent default to stop any text selection
    e.preventDefault();

    // Calculate middle of the slider container itself, not the window, to handle resizing better
    const sliderRect = testimonialsSlider.getBoundingClientRect();
    const clickX = e.clientX - sliderRect.left;
    const middle = sliderRect.width / 2;

    const cardAmount =
      document.querySelector(".testimonial-card").offsetWidth + 30; // Card width + gap

    // Optionally scale down cursor slightly on click for feedback
    dragCursor.style.transform = "translate(-50%, -50%) scale(0.9)";
    setTimeout(() => {
      dragCursor.style.transform = "translate(-50%, -50%) scale(1)";
    }, 150);

    if (clickX < middle) {
      // Clicked left half, scroll backward
      testimonialsSlider.scrollBy({
        left: -cardAmount,
        behavior: "smooth",
      });
    } else {
      // Clicked right half, scroll forward
      testimonialsSlider.scrollBy({
        left: cardAmount,
        behavior: "smooth",
      });
    }
  });

  // Make sure dragging is disabled so clicks register cleanly
  testimonialsSlider.style.cursor = "none";
}
