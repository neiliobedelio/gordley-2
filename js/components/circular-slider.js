// circular-slider.js

document.addEventListener('DOMContentLoaded', () => {
    const sliderSection = document.getElementById('circular-slider');
    if (!sliderSection) return;

    // Configuration for slides
    const slidesData = [
        {
            title: "<span class='highlight'>Design</span> & Prototyping",
            desc: "Our design systems and interactive prototypes bring ideas to life. We focus on accessibility, interaction design, and beautiful user interfaces.",
            image: "assets/capabilities/creative.png"
        },
        {
            title: "<span class='highlight'>User</span> Research",
            desc: "Understanding real human needs to build products that perfectly align with your audience's expectations and behaviors.",
            image: "assets/capabilities/strategy.jpg"
        },
        {
            title: "Motion & <span class='highlight'>Interaction</span>",
            desc: "We weave subtle animations and purposeful interactions into the fabric of the experience to create emotional connections.",
            image: "assets/capabilities/bird.jpg"
        },
        {
            title: "<span class='highlight'>Design</span> Systems",
            desc: "Creating scalable, reusable component libraries that ensure consistency and speed up development cycles across your ecosystem.",
            image: "assets/kirstenmarie-tjFQ_G_zQpU-unsplash.jpg"
        }
    ];

    // DOM Elements
    const bgContainer = sliderSection.querySelector('.slider-bg-container');
    const titleEl = sliderSection.querySelector('.slider-title');
    const descEl = sliderSection.querySelector('.slider-desc');
    const contentWrapper = sliderSection.querySelector('.slider-content');
    const navRing = sliderSection.querySelector('.circle-nav-ring');

    // Setup UI for Progress and Dots
    const metaContainer = document.createElement('div');
    metaContainer.className = 'slider-meta';

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';

    const progressContainer = document.createElement('div');
    progressContainer.className = 'slider-progress';

    const progressBar = document.createElement('div');
    progressBar.className = 'slider-progress-bar';
    progressContainer.appendChild(progressBar);

    metaContainer.appendChild(dotsContainer);
    metaContainer.appendChild(progressContainer);

    // Insert before title
    contentWrapper.insertBefore(metaContainer, titleEl);

    // Create background images
    const bgs = [];
    slidesData.forEach((slide, index) => {
        const bg = document.createElement('div');
        bg.className = 'slider-bg-image';
        if (index === 0) bg.classList.add('active');
        bg.style.backgroundImage = `url('${slide.image}')`;
        bgContainer.appendChild(bg);
        bgs.push(bg);
    });

    // Calculate layout variables for the circle
    const items = [];
    const dots = [];
    const radiusOffset = window.innerWidth <= 900 ? '30vh' : '50vh';
    const spacingDeg = 25; // Degrees between each item
    const startDeg = 180;  // 9 o'clock position

    // Set up initial positions
    let currentRotation = 0; // Ring rotation
    let activeIndex = 0;

    // Autoplay configuration
    const AUTOPLAY_DURATION = 15000; // 15 seconds
    let autoplayTimer;

    function startAutoplay() {
        clearTimeout(autoplayTimer);

        // Reset progress bar without transition first
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';

        // Force reflow so the 0% applies before we add the transition
        void progressBar.offsetWidth;

        // Set transition and animate to 100%
        progressBar.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;
        progressBar.style.width = '100%';

        autoplayTimer = setTimeout(() => {
            const nextIndex = (activeIndex + 1) % slidesData.length;
            goToSlide(nextIndex);
        }, AUTOPLAY_DURATION);
    }

    // Create thumbnail buttons and dots
    slidesData.forEach((slide, index) => {
        // Thumbnail Item
        const item = document.createElement('button');
        item.className = 'circle-item';
        if (index === 0) item.classList.add('active');
        item.setAttribute('data-index', index);
        item.setAttribute('aria-label', `Slide ${index + 1}: ${slide.title}`);

        const inner = document.createElement('div');
        inner.className = 'circle-item-inner';
        inner.textContent = (index + 1).toString().padStart(2, '0');
        item.appendChild(inner);

        const itemAngle = startDeg + (index * spacingDeg);
        item.style.transform = `rotate(${itemAngle}deg) translate(${radiusOffset}) rotate(-${itemAngle}deg)`;
        item.dataset.angle = itemAngle;

        item.addEventListener('click', () => {
            goToSlide(index);
        });

        navRing.appendChild(item);
        items.push(item);

        // Dot Item
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    // Initialize content
    titleEl.innerHTML = slidesData[0].title;
    descEl.innerHTML = slidesData[0].desc;

    // Trigger animation for initial load and start autoplay
    setTimeout(() => {
        contentWrapper.classList.add('active');
        startAutoplay();
    }, 100);

    // Transition function
    function goToSlide(index) {
        if (index === activeIndex) return;

        const previousIndex = activeIndex;
        activeIndex = index;

        // 1. Update active classes on nav and dots
        items[previousIndex].classList.remove('active');
        items[activeIndex].classList.add('active');

        dots[previousIndex].classList.remove('active');
        dots[activeIndex].classList.add('active');

        // 2. Rotate the ring
        const targetItemAngle = parseFloat(items[activeIndex].dataset.angle);
        currentRotation = startDeg - targetItemAngle;

        navRing.style.transform = `rotate(${currentRotation}deg)`;

        // 3. Counter-rotate all items so they remain upright
        items.forEach(item => {
            const itemInitialAngle = parseFloat(item.dataset.angle);
            const counterRotation = -(itemInitialAngle + currentRotation);
            item.style.transform = `rotate(${itemInitialAngle}deg) translate(${radiusOffset}) rotate(${counterRotation}deg)`;
        });

        // 4. Fade out text, change content, fade in
        contentWrapper.classList.remove('active');

        // Restart autoplay immediately on slide change
        startAutoplay();

        // 5. Crossfade background
        bgs[previousIndex].classList.remove('active');
        bgs[activeIndex].classList.add('active');

        // Wait half a second for text fade out, swap text, fade back in
        setTimeout(() => {
            titleEl.innerHTML = slidesData[activeIndex].title;
            descEl.innerHTML = slidesData[activeIndex].desc;

            // Force a browser reflow so the transition is calculated from 0% background-size
            void titleEl.offsetWidth;

            contentWrapper.classList.add('active');
        }, 400); // Wait for fade out to mostly finish before swapping text
    }
});
