function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

function toggleFeature(element) {
    let p = element.querySelector("p");
    p.classList.toggle("hidden");
}
