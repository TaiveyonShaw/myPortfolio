let currentPage = "about";
const userTheme = localStorage.getItem("theme");
const currentYear = new Date().getFullYear();

window.toggleTheme = toggleTheme;

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
    html.style.setProperty("--bg-secondary", "#f8e5d7");
    html.style.setProperty("--border", "#e5e7eb");
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
    html.style.setProperty("--bg-secondary", "#202020");
    html.style.setProperty("--border", "#374151");
    html.style.setProperty("color-scheme", "dark");
  }
}

// Utility to load external HTML into an element
async function loadComponent(id, path) {
  const res = await fetch(`${path}?_=${Date.now()}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Load content into the #content container
async function loadPage(pageName) {
  const res = await fetch(`components/${pageName}.html?_=${Date.now()}`);
  const html = await res.text();
  document.getElementById("content").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer first
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Now safe to insert current year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // Initial page load
  loadPage(currentPage);

  // System theme detection
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.style.colorScheme = "dark";
    document.querySelector(".sun-icon").style.display = "inline";
    document.querySelector(".moon-icon").style.display = "none";
  }
});

// Listen for nav link clicks (delegation)
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-page]")) {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    if (page !== currentPage) {
      currentPage = page;
      loadPage(page);
    }
  }
});
