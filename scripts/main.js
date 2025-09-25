// Particle animation
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

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

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initParticles();

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
