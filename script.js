// core behavior for all pages
const GOOGLE_CLIENT_ID = "963634215234-hbpjdv00ouvfh1v3egmpavtc326r3l6u.apps.googleusercontent.com"; // your client id (used by signin widget)

// MENU: offcanvas open/close
function toggleMenu(){
  const m = document.getElementById('offcanvas-menu');
  if(!m) return;
  m.classList.toggle('open');
}

// FEATURE toggle (multiple allowed)
function toggleFeature(el){
  el.classList.toggle('open');
}

// Local demo user/session helpers
function saveUser(user){ localStorage.setItem('ops_user', JSON.stringify(user)); }
function getUser(){ try{ return JSON.parse(localStorage.getItem('ops_user')); }catch(e){return null;} }
function logout(){ localStorage.removeItem('ops_user'); window.location.href='index.html'; }

// buyPlan mock for demo (stores subscription in localStorage)
function buyPlan(planId, months){
  const u = getUser();
  if(!u){ alert('Please sign up / log in first.'); window.location.href='signup.html'; return; }
  const now = new Date();
  const end = new Date(now.setMonth(now.getMonth() + months));
  u.subscriptionPlan = planId; u.subscriptionStart = new Date().toISOString(); u.subscriptionEnd = end.toISOString();
  saveUser(u);
  alert(`Subscribed (${planId}) until ${end.toDateString()}`);
  window.location.href='index.html';
}

// signup & login handlers (demo)
function signup(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name=name]').value || '';
    const email = form.querySelector('[name=email]').value || '';
    const user = {name,email,created:new Date().toISOString()};
    saveUser(user);
    alert('Account created and logged in.');
    window.location.href='index.html';
  });
}
function attachLogin(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = form.querySelector('[name=email]').value || '';
    const u = getUser() || {};
    u.email = email; u.lastLogin = new Date().toISOString();
    saveUser(u);
    alert('Logged in.');
    window.location.href='index.html';
  });
}

// Google sign-in handler (client-side JWT decode)
function handleCredentialResponse(response){
  try{
    const data = jwt_decode(response.credential);
    const u = { name: data.name || data.email, email: data.email, googleId: data.sub, created: new Date().toISOString() };
    saveUser(u);
    alert('Google sign-in successful. Welcome ' + (u.name||''));
    window.location.href = 'index.html';
  } catch(e){ console.error('google decode failed', e); alert('Google sign-in failed'); }
}

// expose functions to global scope for onclicks
window.toggleMenu = toggleMenu;
window.toggleFeature = toggleFeature;
window.buyPlan = buyPlan;
window.signup = signup;
window.attachLogin = attachLogin;
window.logout = logout;
window.handleCredentialResponse = handleCredentialResponse;
