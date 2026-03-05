// Glitch Text Hero Animation Logic

const speed = 1.0;

function initGlitch() {
    // Only target the H1 ("GORDLEY"), leaving "DESIGN" static
    const targets = document.querySelectorAll(".glitch-group h1");
    if (!targets.length || typeof Splitting === "undefined" || typeof gsap === "undefined") {
        return;
    }

    // Init splitting on all titles
    const split = Splitting({
        target: targets,
        by: "chars"
    });

    split.forEach(splitInstance => {
        if (splitInstance.chars && splitInstance.chars.length > 0) {
            const letters = duplicateChars(splitInstance.chars);
            anim(letters);
        }
    });
}

function randRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function duplicateChars(chars) {
    return chars.map((char) => {
        // 1. Create an outer wrapper to act as an overflow mask window (1 character tall)
        const wrapper = document.createElement("span");
        wrapper.classList.add("char-wrapper");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "bottom";
        wrapper.style.height = "1em";
        wrapper.style.lineHeight = "1";

        // 2. Set up the inner char as a tall flex column to hold all the cloned letters
        char.style.display = "inline-flex";
        char.style.flexDirection = "column";
        char.style.lineHeight = "1";

        // Grab the actual text letter and clear the container
        const text = char.getAttribute('data-char') || char.innerText;
        char.innerHTML = '';

        // 3. Create 10 stacked copies of the letter to scroll through
        for (let i = 0; i < 10; i++) {
            const clone = document.createElement("span");
            clone.innerText = text;
            clone.style.lineHeight = "1";
            clone.style.height = "1em";
            clone.style.display = "block";
            char.appendChild(clone);
        }

        // Wrap the inner column inside the mask window
        char.parentNode.insertBefore(wrapper, char);
        wrapper.appendChild(char);

        return char; // Return the inner column to animate
    });
}

function anim(letters) {
    // Loop the odometer animation indefinitely
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    letters.forEach((letter) => {
        // Scroll down to a random specific letter copy
        const copies = randRange(2, 9);
        // Move up by exact em units (e.g. -2em, -3em)
        const gotoY = `-${copies}em`;

        // 2x Slower rolling speed
        const animationSpeed = (Math.random() * 1.0) + 0.8;

        // Use a smooth in-out ease to feel like a heavy physical gear starting and stopping
        tl.to(letter, {
            duration: animationSpeed,
            y: gotoY,
            ease: "power2.inOut",
            yoyo: true, // Roll back to starting letter
            repeat: 1
        }, Math.random() * 0.4); // Random offset start time for each letter
    });

    tl.play();
}

// Run immediately since script is at end of body
setTimeout(initGlitch, 100);
