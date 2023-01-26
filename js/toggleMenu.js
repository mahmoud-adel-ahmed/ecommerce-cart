let bars = document.querySelector(".menu");
let nav = document.querySelector("nav");

function toggle() {
  nav.classList.toggle("active");
  bars.classList.toggle("fa-times");
}

bars.addEventListener("click", toggle);
