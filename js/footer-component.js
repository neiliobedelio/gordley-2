class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Simple logic to determine relative path to root
        // If we are deep in case-studies, we need to go up.
        // This is a basic check; can be made more robust if structure changes.
        const isCaseStudy = window.location.pathname.includes('/case-studies/');
        const basePath = isCaseStudy ? '../../' : '';

        this.innerHTML = `
        <footer class="footer">
            <div class="footer__logo-column">
                <img src="${basePath}assets/big-logo.svg" alt="Gordley Group Logo Mark" class="footer-logo">
            </div>
            <div class="footer__links-container">
                <div class="footer__locsocials-column">
                    <div>
                        <span class="phone">520.840.7938</span>
                        <p><a href="mailto:mail@gordleygroup.com">mail@gordleygroup.com</a></p>
                    </div>
                
                    <div style="margin-top:10px;">
                        <p>313 N Gilbert Rd. <br> Suite 200</p>
                        <p>Gilbert, AZ 85234</p>
                    </div>
                    <div class="social__links-wrap">
                        <a class="hover-underline-animation short" href="https://www.instagram.com/gordleygroup/" target="_blank">INSTAGRAM</a>
                        <a class="hover-underline-animation short" href="https://twitter.com/GordleyGroup" target="_blank">TWITTER</a>
                        <a class="hover-underline-animation short" href="https://www.facebook.com/gordleygroup/" target="_blank">FACEBOOK</a>
                        <a class="hover-underline-animation short" href="https://www.linkedin.com/company/10257589/" target="_blank">LINKEDIN</a>
                    </div>
                </div>
                <div class="footer__pages-column">
                    <div class="social__links-wrap">
                        <a class="hover-underline-animation left" href="${basePath}about.html">ABOUT</a>
                        <a class="hover-underline-animation left" href="${basePath}index.html#capabilities">CAPABILITIES</a>
                        <a class="hover-underline-animation left" href="${basePath}projects.html">OUR WORK</a>
                        <a class="hover-underline-animation left" href="#">GORDLEY GROUP STUDIOS</a>
                        <a class="hover-underline-animation left" href="#">WEB APPS</a>
                        <a class="hover-underline-animation left" href="#">SMB</a>
                        <a class="hover-underline-animation left" href="${basePath}index.html#contact">CONTACT</a>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
