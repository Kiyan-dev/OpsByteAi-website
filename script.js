document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // Close menu when clicking a link (mobile fix)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // LOGIN STATE MANAGEMENT
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');

    function updateNav() {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            if (loginLink) loginLink.textContent = "Dashboard";
            if (signupLink) signupLink.style.display = "none";
        } else {
            if (loginLink) loginLink.textContent = "Log In";
            if (signupLink) signupLink.style.display = "inline-block";
        }
    }
    updateNav();

    // Fake Login Example (Replace with real auth later)
    const loginForm = document.querySelector("form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            localStorage.setItem("loggedInUser", "true");
            window.location.href = "index.html";
        });
    }
});
