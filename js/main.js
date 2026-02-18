// Initialize Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileMenu.classList.remove('active');
    });
});

// Video Modal
const watchReelBtn = document.getElementById('watch-reel-btn');
const videoModal = document.getElementById('video-modal');
const closeModalBtn = document.getElementById('close-modal');

watchReelBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

closeModalBtn.addEventListener('click', () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside content
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Scroll to Top logic is now handled in footer-component.js

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Process Section Tabs & Slideshow
const processTabs = document.querySelectorAll('.process-tab');
const processSlides = document.querySelectorAll('.process-slide');
const processContainer = document.querySelector('.process-container');
let currentProcessIndex = 0;
let processInterval;

function switchProcessTab(index) {
    // Remove active class from all
    processTabs.forEach(tab => tab.classList.remove('active'));
    processSlides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current
    processTabs[index].classList.add('active');
    processSlides[index].classList.add('active');

    currentProcessIndex = index;
}

// Event Listeners for Tabs
processTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        switchProcessTab(index);
        resetProcessInterval(); // Reset timer on manual interaction
    });
});

// Auto Rotation
function startProcessInterval() {
    processInterval = setInterval(() => {
        let nextIndex = (currentProcessIndex + 1) % processTabs.length;
        switchProcessTab(nextIndex);
    }, 5000); // Switch every 5 seconds
}

function resetProcessInterval() {
    clearInterval(processInterval);
    startProcessInterval();
}

// Pause on hover
if (processContainer) {
    processContainer.addEventListener('mouseenter', () => {
        clearInterval(processInterval);
    });

    processContainer.addEventListener('mouseleave', () => {
        startProcessInterval();
    });

    // Start the slideshow
    startProcessInterval();
}


