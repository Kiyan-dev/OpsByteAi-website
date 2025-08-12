// NAV / burger behavior
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // close nav when any link clicked (mobile)
    nav.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('active'));
    });
  }
});

// Demo auth helpers (localStorage)
function getUser() {
  try { return JSON.parse(localStorage.getItem('ops_user')); } catch { return null; }
}
function setUser(u) { localStorage.setItem('ops_user', JSON.stringify(u)); }

// prettified sign-in popup
function showSignInPopup() {
  if (document.querySelector('.popup-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup-box">
      <h2>Sign in required</h2>
      <p>To complete this purchase you must sign in. You can sign up or log in quickly.</p>
      <a class="btn primary" href="login.html">Sign in</a>
      <div style="height:10px"></div>
      <a class="btn ghost" href="signup.html">Create account</a>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.style.display = 'flex';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// buyBundle handler (demo)
function buyBundle(planId, months) {
  const user = getUser();
  if (!user) {
    showSignInPopup();
    return;
  }
  // demo: mark subscription locally
  const now = new Date();
  const end = new Date(now);
  end.setMonth(end.getMonth() + months);
  user.subscription = { plan: planId, months: months, until: end.toISOString() };
  setUser(user);
  alert(`Demo: subscribed to ${planId} for ${months} months (until ${end.toDateString()})`);
  window.location.href = 'index.html';
}

// handle plan choose button
function handleSelect(planId) {
  const user = getUser();
  if (!user) { showSignInPopup(); return; }
  // in real app this would open checkout
  alert(`You selected ${planId}. Proceeding to checkout (demo).`);
  // redirect to signup/demo for now
  window.location.href = 'signup.html';
}
