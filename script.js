document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
});

function requireLogin() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Please Sign In</h2>
      <p>You need to be logged in to continue to checkout.</p>
      <a href="login.html" class="btn-green">Login</a>
      <a href="signup.html" class="btn-green">Sign Up</a>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });
}
