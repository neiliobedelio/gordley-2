document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('about-toggle');
    const body = document.body;
    const projectInfo = document.getElementById('project-info');

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
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
    }

    // Toggle the open state on the body
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isOpen = body.classList.toggle('is-open');

            // Update ARIA attributes for accessibility
            toggleButton.setAttribute('aria-expanded', isOpen);
            projectInfo.setAttribute('aria-hidden', !isOpen);

            console.log('About panel toggled:', isOpen);
        });
    }
});
