function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function toggleFeature(element) {
    const p = element.querySelector('p');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

// Subscription check placeholder
function checkSubscription(user) {
    const now = new Date();
    if (user.subscriptionEnd && now > new Date(user.subscriptionEnd)) {
        alert("Your subscription has expired. Please renew to continue.");
        // Redirect to pricing
        window.location.href = 'pricing.html';
    }
}
