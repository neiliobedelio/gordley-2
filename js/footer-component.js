class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Simple logic to determine relative path to root
    const isCaseStudy = window.location.pathname.includes("/case-studies/");
    const basePath = isCaseStudy ? "../../" : "";

    this.innerHTML = `
        <div id="gravity-container" style="width: 100%; height: 300px; background: transparent; overflow: hidden; position: relative;"></div>
        <footer class="footer" style="padding-top: 50px;"> <!-- Reduced padding since gravity area is above -->
            <div class="footer__logo-column">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2002.5 245.1" class="footer-logo" style="color: var(--footer-text);">
                  <defs>
                    <style>
                      .st0 {
                        fill: currentColor;
                      }
                    </style>
                  </defs>
                  <path class="st0" d="M0,48.6v-30.8h134.1v30.8h-48.2v128.5h-37.6V48.6H0Z"/>
                  <path class="st0" d="M190.7,108.9v68.2h-37.3V17.8h36.6v69.9h-2.4c2.9-9.5,7.5-17.1,13.7-22.9,6.2-5.8,14.6-8.7,25.2-8.7s15.6,1.9,21.8,5.6c6.2,3.7,11,8.9,14.4,15.7,3.4,6.8,5.1,14.6,5.1,23.6v76.1h-37.3v-68.8c0-6.7-1.7-12-5.1-15.8-3.4-3.8-8.2-5.7-14.3-5.7s-7.5.9-10.6,2.6c-3.1,1.7-5.5,4.3-7.2,7.5-1.7,3.3-2.6,7.3-2.6,12Z"/>
                  <path class="st0" d="M348.2,179.4c-12.5,0-23.2-2.5-32.3-7.4-9.1-5-16-12-20.8-21.2-4.8-9.2-7.2-20.2-7.2-32.9s2.4-23,7.2-32.3c4.8-9.3,11.6-16.5,20.5-21.6,8.8-5.2,19.2-7.8,31.2-7.8s16.1,1.3,23.1,4c7,2.6,13.1,6.5,18.3,11.7,5.2,5.2,9.2,11.5,12,19.1,2.8,7.6,4.2,16.3,4.2,26.2v9.4h-103.3v-21.7h85.5l-17.4,5.1c0-5.6-.8-10.3-2.5-14.3-1.7-4-4.2-7.1-7.4-9.2-3.3-2.1-7.3-3.2-12.2-3.2s-8.9,1.1-12.3,3.3c-3.4,2.2-5.9,5.2-7.6,9.1-1.7,3.9-2.6,8.4-2.6,13.6v15.6c0,6.1,1,11.2,3,15.3,2,4.1,4.9,7.2,8.5,9.2s7.9,3,12.7,3,6.4-.5,9.1-1.4c2.7-.9,5.1-2.3,7.1-4.2,2-1.9,3.4-4.1,4.4-6.7l33.2,5.5c-2,6.8-5.4,12.8-10.3,17.9-4.9,5.1-11,9-18.5,11.8-7.4,2.8-16,4.2-25.7,4.2Z"/>
                  <path class="st0" d="M496.9,179.3c-15.1,0-28.4-3.3-39.9-9.9-11.5-6.6-20.4-16-26.9-28.2-6.5-12.2-9.7-26.7-9.7-43.4s3.4-32.2,10.2-44.4c6.8-12.2,15.9-21.6,27.4-28,11.4-6.4,24.2-9.7,38.4-9.7s17.7,1.3,25.6,4c7.9,2.6,14.9,6.4,21.1,11.2,6.2,4.8,11.2,10.6,15,17.2,3.8,6.6,6.2,13.8,7.2,21.8h-38.2c-.9-3.3-2.3-6.2-4-8.8-1.7-2.6-3.9-4.8-6.5-6.6-2.6-1.8-5.5-3.2-8.7-4.1-3.2-.9-6.9-1.4-10.9-1.4-7.7,0-14.4,1.9-20.2,5.7-5.7,3.8-10.2,9.3-13.3,16.5-3.1,7.2-4.7,16-4.7,26.2s1.5,19.1,4.5,26.4c3,7.3,7.4,12.8,13.1,16.7,5.7,3.8,12.5,5.8,20.5,5.8s13.3-1.2,18.2-3.5c5-2.4,8.7-5.7,11.3-10.1,2.6-4.4,3.8-9.5,3.8-15.4l7.2,1h-39v-27.7h68.3v21c0,14.2-3,26.4-9,36.5-6,10.2-14.3,17.9-24.9,23.4-10.6,5.4-22.7,8.1-36.3,8.1Z"/>
                  <path class="st0" d="M644.2,179.4c-12.5,0-23.2-2.6-32.2-7.8-9-5.2-15.9-12.4-20.7-21.6-4.8-9.2-7.2-20-7.2-32.2s2.4-23.1,7.2-32.3c4.8-9.2,11.7-16.4,20.7-21.6,9-5.2,19.7-7.8,32.2-7.8s23.2,2.6,32.2,7.8c9,5.2,15.9,12.4,20.6,21.6,4.8,9.2,7.2,20,7.2,32.3s-2.4,23-7.2,32.2c-4.8,9.2-11.7,16.4-20.6,21.6-9,5.2-19.7,7.8-32.2,7.8ZM644.2,150.8c4.8,0,8.8-1.4,12.1-4.2,3.3-2.8,5.8-6.7,7.4-11.7,1.7-5,2.5-10.8,2.5-17.4s-.8-12.4-2.5-17.4c-1.7-5-4.2-8.8-7.4-11.5-3.3-2.7-7.3-4.1-12.1-4.1s-8.8,1.4-12.1,4.1c-3.3,2.7-5.8,6.5-7.4,11.5-1.7,5-2.5,10.7-2.5,17.4s.8,12.4,2.5,17.4c1.7,5,4.2,8.9,7.4,11.7,3.3,2.8,7.3,4.2,12.1,4.2Z"/>
                  <path class="st0" d="M724.3,177.1V57.6h36.2v21.8h1.3c2.1-7.9,5.7-13.8,10.6-17.6,5-3.8,10.7-5.7,17.3-5.7s3.5.1,5.4.3c1.9.2,3.6.5,5.2,1v32.5c-1.8-.6-4.1-1.1-7-1.4-2.9-.3-5.5-.5-7.8-.5-4.6,0-8.7,1-12.3,3s-6.5,4.8-8.6,8.4c-2.1,3.6-3.1,7.7-3.1,12.5v65.2h-37.3Z"/>
                  <path class="st0" d="M853.4,178.8c-8.8,0-16.9-2.3-24.2-6.9-7.3-4.6-13-11.4-17.3-20.5-4.3-9.1-6.4-20.4-6.4-33.9s2.2-25.5,6.7-34.6c4.5-9.1,10.3-15.8,17.5-20.2,7.2-4.4,15-6.6,23.4-6.6s11.8,1.1,16.2,3.3c4.5,2.2,8.2,4.9,11.1,8.3,2.9,3.4,5.1,6.8,6.6,10.5h.9V17.8h37.2v159.3h-36.8v-19.3h-1.3c-1.6,3.6-3.8,6.9-6.8,10.2-3,3.2-6.6,5.8-11,7.9-4.4,2-9.6,3-15.8,3ZM866.1,149.8c4.7,0,8.7-1.3,12.1-4,3.4-2.7,6-6.4,7.8-11.3,1.8-4.8,2.7-10.5,2.7-17s-.9-12.3-2.7-17.2c-1.8-4.8-4.4-8.5-7.8-11.1-3.4-2.6-7.4-3.9-12.1-3.9s-8.8,1.3-12.1,4c-3.3,2.7-5.8,6.4-7.5,11.2-1.7,4.8-2.6,10.5-2.6,16.9s.9,12.1,2.6,16.9c1.7,4.9,4.2,8.7,7.5,11.3,3.3,2.7,7.4,4,12.1,4Z"/>
                  <path class="st0" d="M987.1,17.8v159.3h-37.3V17.8h37.3Z"/>
                  <path class="st0" d="M1067.4,179.4c-12.5,0-23.2-2.5-32.3-7.4-9.1-5-16-12-20.8-21.2-4.8-9.2-7.2-20.2-7.2-32.9s2.4-23,7.2-32.3c4.8-9.3,11.6-16.5,20.5-21.6,8.8-5.2,19.2-7.8,31.2-7.8s16.1,1.3,23.1,4c7,2.6,13.1,6.5,18.3,11.7,5.2,5.2,9.2,11.5,12,19.1,2.8,7.6,4.2,16.3,4.2,26.2v9.4h-103.3v-21.7h85.5l-17.4,5.1c0-5.6-.8-10.3-2.5-14.3-1.7-4-4.2-7.1-7.4-9.2-3.3-2.1-7.3-3.2-12.2-3.2s-8.9,1.1-12.3,3.3c-3.4,2.2-5.9,5.2-7.6,9.1-1.7,3.9-2.6,8.4-2.6,13.6v15.6c0,6.1,1,11.2,3,15.3,2,4.1,4.9,7.2,8.5,9.2s7.9,3,12.7,3,6.4-.5,9.1-1.4c2.7-.9,5.1-2.3,7.1-4.2,2-1.9,3.4-4.1,4.4-6.7l33.2,5.5c-2,6.8-5.4,12.8-10.3,17.9-4.9,5.1-11,9-18.5,11.8-7.4,2.8-16,4.2-25.7,4.2Z"/>
                  <path class="st0" d="M1139.2,219l8.3-27.3,4.7,1.3c4.5,1.1,8.4,1.5,11.8,1,3.4-.5,6-1.7,7.8-3.7,1.8-2,2.6-4.6,2.4-7.9v-5c-.1,0-44.7-119.7-44.7-119.7h39.3l17.9,58.5c2.4,8,4.3,16,5.7,24.1,1.4,8.1,3,16.7,5,26h-7.7c1.9-9.3,3.8-18,5.8-26.1,1.9-8.1,4.1-16.1,6.6-23.9l19.1-58.5h38.9l-50.1,132.1c-2.4,6.4-5.6,12.1-9.5,17.1-3.9,5-8.9,8.8-15,11.7-6.1,2.8-13.6,4.2-22.6,4.2s-9-.3-13.2-1c-4.2-.7-7.8-1.6-10.5-2.6Z"/>
                  <path class="st0" d="M1347.7,179.3c-15.1,0-28.4-3.3-39.9-9.9-11.5-6.6-20.4-16-26.9-28.2-6.5-12.2-9.7-26.7-9.7-43.4s3.4-32.2,10.2-44.4c6.8-12.2,15.9-21.6,27.4-28,11.4-6.4,24.2-9.7,38.4-9.7s17.7,1.3,25.6,4c7.9,2.6,14.9,6.4,21.1,11.2,6.2,4.8,11.2,10.6,15,17.2,3.8,6.6,6.2,13.8,7.2,21.8h-38.2c-.9-3.3-2.3-6.2-4-8.8-1.7-2.6-3.9-4.8-6.5-6.6s-5.5-3.2-8.7-4.1c-3.2-.9-6.9-1.4-10.9-1.4-7.7,0-14.4,1.9-20.2,5.7-5.7,3.8-10.2,9.3-13.3,16.5-3.1,7.2-4.7,16-4.7,26.2s1.5,19.1,4.5,26.4c3,7.3,7.4,12.8,13.1,16.7,5.7,3.8,12.5,5.8,20.5,5.8s13.3-1.2,18.2-3.5c5-2.4,8.7-5.7,11.3-10.1,2.6-4.4,3.8-9.5,3.8-15.4l7.2,1h-39v-27.7h68.3v21c0,14.2-3,26.4-9,36.5-6,10.2-14.3,17.9-24.9,23.4-10.6,5.4-22.7,8.1-36.3,8.1Z"/>
                  <path class="st0" d="M1439.6,177.1V57.6h36.2v21.8h1.3c2.1-7.9,5.7-13.8,10.6-17.6,5-3.8,10.7-5.7,17.3-5.7s3.5.1,5.4.3c1.9.2,3.6.5,5.2,1v32.5c-1.8-.6-4.1-1.1-7-1.4-2.9-.3-5.5-.5-7.8-.5-4.6,0-8.7,1-12.3,3s-6.5,4.8-8.6,8.4c-2.1,3.6-3.1,7.7-3.1,12.5v65.2h-37.3Z"/>
                  <path class="st0" d="M1580.9,179.4c-12.5,0-23.2-2.6-32.2-7.8-9-5.2-15.9-12.4-20.7-21.6-4.8-9.2-7.2-20-7.2-32.2s2.4-23.1,7.2-32.3c4.8-9.2,11.7-16.4,20.7-21.6,9-5.2,19.7-7.8,32.2-7.8s23.2,2.6,32.2,7.8c9,5.2,15.9,12.4,20.6,21.6,4.8,9.2,7.2,20,7.2,32.3s-2.4,23-7.2,32.2c-4.8,9.2-11.7,16.4-20.6,21.6-9,5.2-19.7,7.8-32.2,7.8ZM1580.9,150.8c4.8,0,8.8-1.4,12.1-4.2,3.3-2.8,5.8-6.7,7.4-11.7,1.7-5,2.5-10.8,2.5-17.4s-.8-12.4-2.5-17.4c-1.7-5-4.2-8.8-7.4-11.5-3.3-2.7-7.3-4.1-12.1-4.1s-8.8,1.4-12.1,4.1c-3.3,2.7-5.8,6.5-7.4,11.5-1.7,5-2.5,10.7-2.5,17.4s.8,12.4,2.5,17.4c1.7,5,4.2,8.9,7.4,11.7,3.3,2.8,7.3,4.2,12.1,4.2Z"/>
                  <path class="st0" d="M1702.5,178.6c-8.3,0-15.6-1.9-21.9-5.6-6.2-3.7-11.1-8.9-14.5-15.7-3.4-6.8-5.1-14.6-5.1-23.6V57.6h37.3v68.8c0,6.7,1.7,12,5.2,15.8,3.5,3.8,8.2,5.7,14.3,5.7s7.7-.9,10.7-2.6c3-1.7,5.4-4.3,7.1-7.6,1.7-3.3,2.6-7.3,2.6-11.9V57.6h37.3v119.5h-35.1l-.6-30.1h1.6c-3,9.6-7.6,17.2-13.9,23-6.3,5.8-14.6,8.7-25,8.7Z"/>
                  <path class="st0" d="M1800.1,221.8V57.6h36.9v20.5h1.3c1.5-3.6,3.7-7.1,6.6-10.5,2.9-3.3,6.6-6.1,11-8.3,4.5-2.2,9.9-3.3,16.2-3.3s16.2,2.2,23.5,6.6c7.2,4.4,13.1,11.1,17.5,20.2,4.5,9.1,6.7,20.6,6.7,34.6s-2.1,24.9-6.4,33.9c-4.3,9.1-10,15.9-17.3,20.5-7.3,4.6-15.3,6.9-24.2,6.9s-11.3-1-15.8-3c-4.5-2-8.1-4.7-11.1-7.9-2.9-3.2-5.2-6.6-6.7-10.2h-.9v64h-37.3ZM1859.1,149.8c4.8,0,8.8-1.3,12.1-4,3.3-2.7,5.8-6.4,7.5-11.3,1.7-4.9,2.6-10.5,2.6-16.9s-.9-12.1-2.6-16.9c-1.7-4.8-4.2-8.6-7.5-11.2-3.3-2.7-7.3-4-12.2-4s-8.8,1.3-12.2,3.9c-3.4,2.6-5.9,6.3-7.7,11.1-1.8,4.8-2.7,10.5-2.7,17.2s.9,12.2,2.7,17c1.8,4.8,4.4,8.6,7.8,11.3,3.4,2.7,7.4,4,12.1,4Z"/>
                  <path class="st0" d="M1966,179.4c-5.7,0-10.5-1.9-14.4-5.7-3.9-3.8-5.8-8.6-5.8-14.3s1.9-10.4,5.8-14.2c3.9-3.8,8.7-5.7,14.4-5.7s10.5,1.9,14.4,5.7c3.9,3.8,5.8,8.5,5.8,14.2s-1.9,10.5-5.8,14.3c-3.9,3.8-8.7,5.7-14.4,5.7Z"/>
                </svg>
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

    // Load Matter.js if not present
    if (!window.Matter) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
      script.onload = () => this.initGravity();
      document.head.appendChild(script);
    } else {
      this.initGravity();
    }
  }

  initGravity() {
    const container = this.querySelector("#gravity-container");
    if (!container || !window.Matter) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Events = Matter.Events,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    // Improve simulation precision for stacking
    engine.positionIterations = 10;
    engine.velocityIterations = 10;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create renderer
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: "transparent",
        wireframes: false, // Important for custom rendering
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Letter Definitions from Logo SVG Paths
    const textToRender = "GORDLEY";
    const letters = [];

    // Extracted SVG bounding boxes and paths from the new asset*.svg files
    const svgData = {
      G: {
        d: "M49.9,104.59c-9.89,0-18.58-2.11-26.08-6.32-7.5-4.21-13.34-10.22-17.53-18.01C2.1,72.46,0,63.21,0,52.5s2.24-20.72,6.73-28.54c4.49-7.82,10.49-13.76,18.01-17.84C32.27,2.04,40.6,0,49.77,0c6.02,0,11.61.85,16.78,2.56,5.17,1.71,9.76,4.14,13.77,7.28,4.01,3.14,7.23,6.85,9.67,11.11,2.44,4.26,3.93,8.94,4.48,14.05h-27.89c-.41-1.73-1.08-3.28-2.02-4.65-.93-1.37-2.1-2.52-3.49-3.45-1.39-.93-2.99-1.64-4.78-2.12-1.8-.48-3.79-.72-5.98-.72-4.6,0-8.54,1.11-11.83,3.32-3.28,2.21-5.78,5.41-7.49,9.6-1.71,4.19-2.56,9.23-2.56,15.11s.82,11.07,2.46,15.31,4.07,7.49,7.28,9.74,7.21,3.38,12,3.38c4.19,0,7.69-.62,10.49-1.85,2.8-1.23,4.9-2.97,6.29-5.23,1.39-2.26,2.08-4.91,2.08-7.96l4.79.55h-23.24v-19.69h45.12v14.08c0,9.3-1.96,17.24-5.88,23.82-3.92,6.59-9.33,11.62-16.24,15.11s-14.8,5.23-23.69,5.23Z",
        x: 0,
        y: 0,
        w: 95.7,
        h: 104.59,
      },
      O: {
        d: "M39.58,78.75c-8.29,0-15.4-1.65-21.33-4.96-5.92-3.3-10.45-7.91-13.57-13.81C1.56,54.08,0,47.21,0,39.37s1.56-14.71,4.68-20.61c3.12-5.9,7.64-10.5,13.57-13.81C24.18,1.65,31.28,0,39.58,0s15.38,1.65,21.26,4.96c5.88,3.3,10.38,7.91,13.5,13.81,3.12,5.9,4.68,12.77,4.68,20.61s-1.56,14.71-4.68,20.61c-3.12,5.9-7.62,10.5-13.5,13.81-5.88,3.3-12.97,4.96-21.26,4.96ZM39.58,58.24c2.37,0,4.41-.75,6.12-2.26,1.71-1.5,3.02-3.68,3.93-6.53.91-2.85,1.37-6.25,1.37-10.22s-.46-7.41-1.37-10.19c-.91-2.78-2.22-4.9-3.93-6.36-1.71-1.46-3.75-2.19-6.12-2.19s-4.49.73-6.22,2.19c-1.73,1.46-3.05,3.58-3.96,6.36-.91,2.78-1.37,6.18-1.37,10.19s.46,7.37,1.37,10.22c.91,2.85,2.23,5.02,3.96,6.53,1.73,1.5,3.8,2.26,6.22,2.26Z",
        x: 0,
        y: 0,
        w: 79.02,
        h: 78.75,
      },
      R: {
        d: "M0,77.38V.96h26.66v14.63h.82c1.37-5.42,3.57-9.38,6.6-11.86,3.03-2.48,6.57-3.73,10.63-3.73,1.18,0,2.37.09,3.55.27,1.18.18,2.32.46,3.42.82v23.38c-1.37-.5-3.04-.85-5.02-1.06s-3.68-.31-5.09-.31c-2.69,0-5.1.6-7.25,1.81-2.14,1.21-3.82,2.89-5.02,5.06-1.21,2.17-1.81,4.71-1.81,7.62v39.78H0Z",
        x: 0,
        y: 0,
        w: 51.68,
        h: 77.38,
      },
      D: {
        d: "M30.08,102.81c-5.42,0-10.42-1.42-15-4.27-4.58-2.85-8.24-7.17-10.97-12.95-2.73-5.79-4.1-13.08-4.1-21.87,0-9.25,1.44-16.76,4.31-22.52,2.87-5.76,6.58-9.99,11.14-12.68,4.56-2.69,9.34-4.03,14.35-4.03,3.78,0,7.1.65,9.95,1.95,2.85,1.3,5.24,3.04,7.18,5.23,1.94,2.19,3.38,4.58,4.34,7.18h.41V0h27.48v101.85h-27.21v-12.58h-.68c-1.05,2.6-2.55,4.91-4.51,6.94-1.96,2.03-4.33,3.63-7.11,4.82-2.78,1.18-5.97,1.78-9.57,1.78ZM40.19,81.76c2.51,0,4.67-.74,6.49-2.22,1.82-1.48,3.22-3.57,4.2-6.25.98-2.69,1.47-5.88,1.47-9.57s-.49-7.03-1.47-9.74c-.98-2.71-2.38-4.8-4.2-6.25-1.82-1.46-3.99-2.19-6.49-2.19s-4.65.73-6.43,2.19c-1.78,1.46-3.13,3.54-4.07,6.25-.93,2.71-1.4,5.96-1.4,9.74s.47,6.96,1.4,9.67c.93,2.71,2.29,4.79,4.07,6.22,1.78,1.44,3.92,2.15,6.43,2.15Z",
        x: 0,
        y: 0,
        w: 79.16,
        h: 102.81,
      },
      L: { d: "M27.48,0v101.85H0V0h27.48Z", x: 0, y: 0, w: 27.48, h: 101.85 },
      E: {
        d: "M39.37,78.75c-8.16,0-15.19-1.56-21.09-4.68-5.9-3.12-10.42-7.62-13.57-13.5C1.57,54.69,0,47.62,0,39.37s1.58-14.78,4.75-20.68c3.17-5.9,7.64-10.49,13.43-13.77C23.97,1.64,30.81,0,38.69,0c5.79,0,11.02.9,15.69,2.7,4.67,1.8,8.67,4.4,12,7.79,3.33,3.4,5.88,7.51,7.66,12.34,1.78,4.83,2.67,10.3,2.67,16.41v6.29H8.48v-15.04h55.37l-12.85,3.14c0-3.1-.46-5.71-1.37-7.83-.91-2.12-2.26-3.74-4.03-4.85-1.78-1.12-3.99-1.67-6.63-1.67s-4.85.56-6.63,1.67c-1.78,1.12-3.12,2.73-4.03,4.85-.91,2.12-1.37,4.73-1.37,7.83v10.94c0,3.37.54,6.16,1.61,8.37,1.07,2.21,2.59,3.85,4.55,4.92,1.96,1.07,4.24,1.61,6.84,1.61,1.87,0,3.57-.26,5.09-.79,1.53-.52,2.84-1.27,3.93-2.26,1.09-.98,1.91-2.18,2.46-3.59l24.2,3.55c-1.28,4.56-3.53,8.51-6.77,11.86-3.24,3.35-7.33,5.94-12.27,7.76-4.95,1.82-10.68,2.73-17.19,2.73Z",
        x: 0,
        y: 0,
        w: 76.7,
        h: 78.75,
      },
      Y: {
        d: "M6.22,102.95l6.02-19.55,3.55.96c3.01.77,5.6.99,7.79.65s3.78-1.08,4.79-2.22c1-1.14,1.23-2.51.68-4.1l-.75-2.19L0,0h28.85l9.91,34.86c1.46,5.24,2.59,10.52,3.38,15.83.8,5.31,1.79,11.15,2.97,17.53h-4.99c1.18-6.38,2.39-12.25,3.62-17.6,1.23-5.35,2.64-10.61,4.24-15.76L58.93,0h28.44l-31.51,83.4c-1.55,4.15-3.65,7.9-6.29,11.25-2.64,3.35-6.07,6-10.29,7.96-4.22,1.96-9.54,2.94-15.96,2.94-3.14,0-6.24-.23-9.3-.68-3.05-.46-5.65-1.09-7.79-1.91Z",
        x: 0,
        y: 0,
        w: 87.36,
        h: 105.55,
      },
    };

    // Initialize Path2D objects for performing custom context drawing
    for (const char in svgData) {
      svgData[char].path2d = new Path2D(svgData[char].d);
    }

    const scale = 1.08; // 0.9 + 20% larger

    // Calculate exact total width to center them and let them touch
    let totalW = 0;
    textToRender
      .split("")
      .forEach((char) => (totalW += svgData[char].w * scale));

    let currentX = (width - totalW) / 2;
    if (currentX < 50) currentX = 50;

    textToRender.split("").forEach((char, index) => {
      const def = svgData[char];
      const charW = def.w * scale;
      const charH = def.h * scale;

      // Start tightly packed so they touch when they land
      const x = currentX + charW / 2;
      currentX += charW;

      const y = -100 - index * 150; // Stagger drop heights significantly

      // Create a body scaled to exactly match SVG bounds
      const body = Bodies.rectangle(x, y, charW, charH, {
        chamfer: { radius: 8 },
        restitution: 0.2, // Lower bounciness so they pile closely
        friction: 0.8,
        render: {
          visible: false, // Don't draw the black box
          text: {
            content: char, // Track original char for rendering below
          },
        },
      });

      letters.push(body);
    });

    // Add Ground (shifted down by 2px to overlap footer top edge)
    const ground = Bodies.rectangle(width / 2, height + 32, width, 60, {
      isStatic: true,
      render: { visible: false },
    });

    // Add Walls (invisible) to keep them in view
    const wallLeft = Bodies.rectangle(-30, height / 2, 60, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height * 2, {
      isStatic: true,
      render: { visible: false },
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // Allow page scrolling by removing the mousewheel event capture
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    Composite.add(world, [
      ...letters,
      ground,
      wallLeft,
      wallRight,
      mouseConstraint,
    ]);

    // Determine the initial fill color from CSS variables
    let currentFillColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--footer-bg")
        .trim() || "#1b1b1b";

    // Listen for theme changes to update the color dynamically
    const observerTarget = document.documentElement;
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          // Slight delay to allow CSS variable to be recomputed
          setTimeout(() => {
            currentFillColor =
              getComputedStyle(document.documentElement)
                .getPropertyValue("--footer-bg")
                .trim() || "#1b1b1b";
          }, 10);
        }
      });
    });
    mutationObserver.observe(observerTarget, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Custom Rendering for SVG text
    Events.on(render, "afterRender", function () {
      const context = render.context;
      context.fillStyle = currentFillColor;

      letters.forEach((body) => {
        const { position, angle, render } = body;
        const char = render.text.content;
        const def = svgData[char];

        if (def && def.path2d) {
          context.save();
          context.translate(position.x, position.y);
          context.rotate(angle);

          // We extracted exact 0-indexed bounds from individual SVGs.
          context.scale(scale, scale);
          context.translate(-def.w / 2, -def.h / 2);

          context.fill(def.path2d);
          context.restore();
        }
      });
    });

    // Intersection Observer to start/stop
    const runner = Runner.create();
    let isRunning = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isRunning) {
              Runner.run(runner, engine);
              Render.run(render);
              isRunning = true;

              // "Jostle" them if they are asleep/stuck in the air
              letters.forEach((body) => {
                if (body.position.y < -50) {
                  // If still above screen (reset state), verify they wake up
                  Matter.Body.setStatic(body, false);
                }
              });
            }
          } else {
            // Optional: Stop when out of view to save performance
            // Runner.stop(runner);
            // Render.stop(render);
            // isRunning = false;
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(container);

    // Handle resize
    window.addEventListener("resize", () => {
      // Basic resize handling
      render.canvas.width = container.clientWidth;
      render.canvas.height = container.clientHeight;
      Matter.Body.setPosition(ground, {
        x: container.clientWidth / 2,
        y: container.clientHeight + 32,
      });
      Matter.Body.setPosition(wallRight, {
        x: container.clientWidth + 30,
        y: container.clientHeight / 2,
      });
    });
  }
}

customElements.define("site-footer", SiteFooter);
