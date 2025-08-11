// ===== BURGER MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector("nav ul");

    burger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    // Close menu when clicking on a link
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
        });
    });
});

// ===== OPTIONAL: SMOOTH SCROLL FOR INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
