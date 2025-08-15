// --------------------------
// Drawer / Burger behavior
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const authModal = document.getElementById("authModal");
  const closeModalBtn = document.querySelector("[data-close-modal]");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  if (burger) burger.addEventListener("click", openDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // Close modal
  if (closeModalBtn && authModal) {
    closeModalBtn.addEventListener("click", () => authModal.classList.remove("show"));
  }

  // Protect purchase buttons
  document.querySelectorAll(".requires-auth").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!isLoggedIn()) {
        e.preventDefault();
        showAuthModal();
      } else {
        // proceed to checkout (placeholder)
        alert("Proceeding to checkout for: " + (btn.dataset.plan || "selected"));
      }
    });
  });

  function showAuthModal() {
    if (authModal) authModal.classList.add("show");
  }
});

// --------------------------
// Simple auth state (Firebase)
// --------------------------
function isLoggedIn() {
  try {
    const u = localStorage.getItem("obs_user");
    return !!u;
  } catch { return false; }
}

// If Firebase scripts are included (login/signup pages), wire them up:
(function initFirebaseIfPresent() {
  if (typeof firebase === "undefined") return; // Firebase not loaded on this page

  // TODO: REPLACE WITH YOUR REAL CONFIG
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID",
  };

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem("obs_user", JSON.stringify({ uid: cred.user.uid, email: cred.user.email }));
        window.location.href = "index.html";
      } catch (err) {
        alert("Login failed: " + (err?.message || err));
      }
    });
  }

  // Signup form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        localStorage.setItem("obs_user", JSON.stringify({ uid: cred.user.uid, email: cred.user.email }));
        window.location.href = "index.html";
      } catch (err) {
        alert("Sign up failed: " + (err?.message || err));
      }
    });
  }

  // Google buttons
  const googleLogin = document.getElementById("googleLogin");
  if (googleLogin) {
    googleLogin.addEventListener("click", async () => {
      try {
        const cred = await auth.signInWithPopup(provider);
        localStorage.setItem("obs_user", JSON.stringify({ uid: cred.user.uid, email: cred.user.email }));
        window.location.href = "index.html";
      } catch (err) {
        alert("Google login failed: " + (err?.message || err));
      }
    });
  }

  const googleSignup = document.getElementById("googleSignup");
  if (googleSignup) {
    googleSignup.addEventListener("click", async () => {
      try {
        const cred = await auth.signInWithPopup(provider);
        localStorage.setItem("obs_user", JSON.stringify({ uid: cred.user.uid, email: cred.user.email }));
        window.location.href = "index.html";
      } catch (err) {
        alert("Google sign up failed: " + (err?.message || err));
      }
    });
  }

  // Keep local login state synced (best-effort for this static demo)
  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem("obs_user", JSON.stringify({ uid: user.uid, email: user.email }));
    } else {
      localStorage.removeItem("obs_user");
    }
  });
})();
