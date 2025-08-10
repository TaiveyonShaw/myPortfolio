// Theme Management
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Get saved theme or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);

// Theme toggle functionality
themeToggle.addEventListener("click", function () {
	const currentTheme = body.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	body.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);

	themeToggle.style.transform = "rotate(360deg)";
	setTimeout(() => {
		themeToggle.style.transform = "rotate(0deg)";
	}, 400);
});

// Smooth scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		}
	});
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in-up").forEach((el) => {
	observer.observe(el);
});

// Active nav link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
	const scrollY = window.scrollY;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 100;
		const sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			navLinks.forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === `#${sectionId}`) {
					link.classList.add("active");
				}
			});
		}
	});
}

window.addEventListener("scroll", updateActiveLink);

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		const targetId = this.getAttribute("href");
		const targetSection = document.querySelector(targetId);

		if (targetSection) {
			targetSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

// Header background on scroll with theme awareness
function updateHeaderBackground() {
	const header = document.querySelector(".header");
	const currentTheme = body.getAttribute("data-theme");

	if (window.scrollY > 100) {
		if (currentTheme === "dark") {
			header.style.background = "rgba(15, 15, 23, 0.95)";
		} else {
			header.style.background = "rgba(255, 255, 255, 0.98)";
		}
	} else {
		if (currentTheme === "dark") {
			header.style.background = "rgba(15, 15, 23, 0.9)";
		} else {
			header.style.background = "rgba(255, 255, 255, 0.95)";
		}
	}
}

window.addEventListener("scroll", updateHeaderBackground);

// Update header background when theme changes
const observer_theme = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (
			mutation.type === "attributes" &&
			mutation.attributeName === "data-theme"
		) {
			updateHeaderBackground();
		}
	});
});

observer_theme.observe(body, {
	attributes: true,
	attributeFilter: ["data-theme"],
});

// Initialize header background
updateHeaderBackground();

// Keyboard accessibility for theme toggle
themeToggle.addEventListener("keydown", function (e) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		themeToggle.click();
	}
});

// Prefers color scheme detection
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Only set theme based on system preference if no saved theme exists
if (!localStorage.getItem("theme")) {
	const systemTheme = mediaQuery.matches ? "dark" : "light";
	body.setAttribute("data-theme", systemTheme);
	localStorage.setItem("theme", systemTheme);
}

// Listen for system theme changes
mediaQuery.addListener((e) => {
	// Only update if user hasn't manually set a preference
	if (!localStorage.getItem("theme-manually-set")) {
		const systemTheme = e.matches ? "dark" : "light";
		body.setAttribute("data-theme", systemTheme);
		localStorage.setItem("theme", systemTheme);
	}
});

// Mark theme as manually set when user clicks toggle
const originalToggleHandler = themeToggle.onclick;
themeToggle.addEventListener("click", function () {
	localStorage.setItem("theme-manually-set", "true");
});
