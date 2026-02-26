document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-next-button",
      prevEl: ".swiper-prev-button",
    },
    effect: "fade",
    loop: true, // Swiper 'infinite' is just true for loop
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });

  // Update body or container attribute based on slide index
  // Note: swiper.realIndex is 0-based index of the active slide.
  swiper.on("slideChange", function (sld) {
    // Find the container to update background
    const container = document.querySelector(".marketing-wrapper-box");
    if (container) {
      container.setAttribute("data-sld", sld.realIndex);
    }
  });

  // Set initial
  const container = document.querySelector(".marketing-wrapper-box");
  if (container) {
    container.setAttribute("data-sld", 0);
  }
});
