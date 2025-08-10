// script.js - global behavior for all pages

const GOOGLE_CLIENT_ID = "963634215234-hbpjdv00ouvfh1v3egmpavtc326r3l6u.apps.googleusercontent.com"; // your client id

// Off-canvas menu
function toggleMenu(){
  const m = document.getElementById('offcanvas-menu');
  if(!m) return;
  m.classList.toggle('open');
}

// feature toggle (multiple can open)
function toggleFeature(el){
  el.classList.toggle('open');
}

// --- simple local auth & subscription helpers (client-side mock) ---
function saveUser(user){
  localStorage.setItem('ops_user', JSON.stringify(user));
}
function getUser(){
  const s = localStorage.getItem('ops_user');
  if(!s) return null;
  try { return JSON.parse(s); } catch(e){ return null; }
}
function logout(){
  localStorage.removeItem('ops_user');
  window.location.href = 'index.html';
}

// check subscription validity (used on protected pages)
function requireActiveSubscription(){
  const u = getUser();
  if(!u || !u.subscriptionPlan){
    alert('You need an active subscription to enter. Please buy a plan.');
    window.location.href = 'pricing.html';
    return false;
  }
  if(u.subscriptionEnd){
    const now = new Date();
    if(new Date(u.subscriptionEnd) < now){
      alert('Your subscription has expired. Please renew.');
      // remove subscription
      u.subscriptionPlan = null; u.subscriptionEnd = null;
      saveUser(u);
      window.location.href = 'pricing.html';
      return false;
    }
  }
  return true;
}

// simple signup/login handlers (no backend)
// signup: create user, optionally set logged in
function signup(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name=name]').value || '';
    const email = form.querySelector('[name=email]').value || '';
    const pw = form.querySelector('[name=password]').value || '';
    const user = {name,email,created: new Date().toISOString()};
    saveUser(user);
    alert('Account created — logged in.');
    window.location.href = 'index.html';
  });
}

// login handler
function attachLogin(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = form.querySelector('[name=email]').value || '';
    // in demo we accept any email
    const u = getUser() || {};
    u.email = email; u.lastLogin = new Date().toISOString();
    saveUser(u);
    alert('Logged in.');
    window.location.href = 'index.html';
  });
}

// Buy plan (mock) - planId, months => store subscription end date
function buyPlan(planId, months){
  const u = getUser();
  if(!u){
    alert('Please sign up or log in first.');
    window.location.href = 'signup.html';
    return;
  }
  const now = new Date();
  const end = new Date(now.setMonth(now.getMonth() + months));
  u.subscriptionPlan = planId;
  u.subscriptionStart = new Date().toISOString();
  u.subscriptionEnd = end.toISOString();
  saveUser(u);
  alert(`Purchase successful. Plan active until ${end.toDateString()}`);
  window.location.href = 'index.html';
}

// Google Identity onload callback
function handleCredentialResponse(response){
  // jwt-decode required to parse (we include CDN in pages)
  try{
    const data = jwt_decode(response.credential);
    const u = { name: data.name || data.email, email: data.email, googleId: data.sub, created: new Date().toISOString() };
    saveUser(u);
    alert('Google sign-in successful. Welcome ' + (u.name||''));
    window.location.href = 'index.html';
  }catch(e){ console.error('google sign-in decode failed', e); alert('Google sign-in failed'); }
}

// expose some functions global so onclicks can use
window.toggleMenu = toggleMenu;
window.toggleFeature = toggleFeature;
window.logout = logout;
window.signup = signup;
window.attachLogin = attachLogin;
window.buyPlan = buyPlan;
window.requireActiveSubscription = requireActiveSubscription;
window.handleCredentialResponse = handleCredentialResponse;
