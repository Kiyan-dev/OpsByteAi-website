// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Features Accordion
    const features = document.querySelectorAll(".feature");
    features.forEach(feature => {
        feature.addEventListener("click", () => {
            feature.classList.toggle("active");
            const content = feature.querySelector(".feature-content");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
