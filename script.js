// Burger Menu Toggle
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Check login before purchasing
function checkLogin() {
    const isLoggedIn = false; // Replace with real login check
    if (!isLoggedIn) {
        alert("Please log in first to proceed with your purchase.");
        window.location.href = "login.html";
    }
}
