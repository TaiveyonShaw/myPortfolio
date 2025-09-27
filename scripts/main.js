const logo = document.getElementById("logo");

function updateLogo(theme) {
  if (theme === "dark") {
    logo.style = "background-image: url('../images/initial-white.png')";
  } else {
    logo.style = "background-image: url('../images/initial-black.png')";
  }
}

// Detect system theme on first load
// const systemPrefersDark = window.matchMedia(
//   "(prefers-color-scheme: dark)"
// ).matches;
// const savedTheme = localStorage.getItem("theme");

// if (savedTheme) {
//   updateLogo(savedTheme);
// } else {
//   updateLogo(systemPrefersDark ? "dark" : "light");
// }

// // Hook this into your theme toggle logic:
// document.getElementById("toggle-theme").addEventListener("click", () => {
//   const newTheme = document.body.classList.toggle("dark-mode")
//     ? "dark"
//     : "light";
//   localStorage.setItem("theme", newTheme);
//   updateLogo(newTheme);
// });

// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (html.style.colorScheme === "dark") {
    html.style.colorScheme = "light";
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
  } else {
    html.style.colorScheme = "dark";
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme based on system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.style.colorScheme = "dark";
    document.querySelector(".sun-icon").style.display = "none";
    document.querySelector(".moon-icon").style.display = "inline";
  }
});

// Get the current year
const currentYear = new Date().getFullYear();

// Insert it into the span with id="year"
document.getElementById("year").textContent = currentYear;
