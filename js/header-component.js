class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const isCaseStudy = window.location.pathname.includes('/case-studies/');
        const depthMatch = window.location.pathname.match(/\//g);
        // Calculate basePath based on directory depth from root, or simply:
        let basePath = '';
        if (window.location.pathname.includes('/case-studies/')) {
            // Count depth inside case-studies, normally it's case-studies/project-name/index.html
            basePath = '../../';
        }

        const isHome = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') && !isCaseStudy;

        // Let's support an attribute to specify styling, or default to nav-dark if it's home
        // The user specifically requested "styling exceptions for the homepage"
        let navClass = "navbar";
        if (this.hasAttribute('nav-class')) {
            navClass += " " + this.getAttribute('nav-class');
        } else if (isHome) {
            navClass += " nav-dark";
        }

        // Additional inline styles for exceptions like marketing.html
        const extraStyles = this.getAttribute('nav-style') || '';

        const contactLink = isHome ? '#contact' : `${basePath}index.html#contact`;

        this.innerHTML = `
            <header class="${navClass}" id="navbar" style="${extraStyles}">
                <div class="logo">
                    <a href="${basePath}index.html" style="text-decoration: none; color: inherit;">
                        <div class="logo-placeholder">The Gordley Group</div>
                    </a>
                </div>
                <div class="desktop-menu">
                    <a href="${basePath}projects.html">Work</a>
                    <a href="${basePath}capabilities.html">Capabilities</a>
                    <a href="${basePath}about.html">About/Culture</a>
                    <a href="${contactLink}">Contact</a>
                    <button class="theme-toggle" aria-label="Toggle Dark Mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px; height:20px;">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px; height:20px; display:none;">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                </div>
                <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </header>

            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu" id="mobile-menu">
                <nav>
                    <ul>
                        <li><a href="${basePath}projects.html">Work</a></li>
                        <li><a href="${basePath}capabilities.html">Capabilities</a></li>
                        <li><a href="${basePath}about.html">About/Culture</a></li>
                        <li><a href="${contactLink}">Contact</a></li>
                        <li>
                            <button class="theme-toggle" aria-label="Toggle Dark Mode" style="margin-top: 20px;">
                                <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px; height:24px;">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                                <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px; height:24px; display:none;">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        `;

        // Hamburger Menu Toggle
        const hamburger = this.querySelector('#hamburger');
        const mobileMenu = this.querySelector('#mobile-menu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('is-active');
                mobileMenu.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            this.querySelectorAll('.mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('is-active');
                    mobileMenu.classList.remove('active');
                });
            });
        }

        // Navbar scroll effect
        const navbar = this.querySelector('#navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Theme Toggle Logic
        const themeToggles = this.querySelectorAll('.theme-toggle');

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateToggleIcons('dark');
        }

        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    this.updateToggleIcons('light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    this.updateToggleIcons('dark');
                }
            });
        });
    }

    updateToggleIcons(theme) {
        const themeToggles = this.querySelectorAll('.theme-toggle');
        themeToggles.forEach(toggle => {
            const sunIcon = toggle.querySelector('.sun-icon');
            const moonIcon = toggle.querySelector('.moon-icon');
            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
            } else {
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
            }
        });
    }
}

// Ensure theme is applied before component loads to prevent flash
(function () {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

customElements.define('site-header', SiteHeader);
