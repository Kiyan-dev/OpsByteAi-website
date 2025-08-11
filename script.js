// Burger menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

// Custom sign-in popup
function showSignInPopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup-overlay");

    popup.innerHTML = `
        <div class="popup-box">
            <h2>Sign In Required</h2>
            <p>Please sign in to continue with your purchase.</p>
            <button onclick="document.body.removeChild(this.closest('.popup-overlay'))">OK</button>
        </div>
    `;

    document.body.appendChild(popup);
    popup.style.display = "flex";
}
