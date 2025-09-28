// Get the current year
const currentYear = new Date().getFullYear();

// Insert it into the span with id="year"
document.getElementById("year").textContent = currentYear;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme based on system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.style.colorScheme = "dark";
    document.querySelector(".sun-icon").style.display = "inline";
    document.querySelector(".moon-icon").style.display = "none";
  }
});

// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (html.style.colorScheme === "dark") {
    // Icon
    html.style.colorScheme = "light";
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
    // Logo
    html.style.setProperty("--logo-bg", 'url("../images/initial-black.png")');
    // Styles
    html.style.setProperty("--text-primary", "#374151");
    html.style.setProperty("--text-secondary", "#6b7280");
    html.style.setProperty("--text-accent", "#3b82f6");
    html.style.setProperty("--bg-primary", "#ffffff");
    html.style.setProperty("--border", "#e5e7eb");
    html.style.setProperty("--shadow", "rgba(0, 0, 0, 0.1)");
    html.style.setProperty("--gradient-from", "#ec4899");
    html.style.setProperty("--gradient-to", "#8b5cf6");
    html.style.setProperty("color-scheme", "light");
  } else {
    // Icon
    html.style.colorScheme = "dark";
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
    // Logo
    html.style.setProperty("--logo-bg", 'url("../images/initial-white.png")');
    // Styles
    html.style.setProperty("--text-primary", "#e5e7eb");
    html.style.setProperty("--text-secondary", "#9ca3af");
    html.style.setProperty("--text-accent", "#60a5fa");
    html.style.setProperty("--bg-primary", "#121212");
    html.style.setProperty("--border", "#374151");
    html.style.setProperty("--shadow", "rgba(0, 0, 0, 0.3)");
    html.style.setProperty("--gradient-from", "#ec4899");
    html.style.setProperty("--gradient-to", "#8b5cf6");
    html.style.setProperty("color-scheme", "dark");
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
