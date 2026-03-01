document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Stagger children if they have reveal class
          const staggeredChildren =
            entry.target.querySelectorAll(".reveal-child");
          staggeredChildren.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("active");
            }, index * 100);
          });
        }
      });
    },
    { threshold: 0.15 },
  );

  reveals.forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  // Enhanced Cursor Glow Effect
  const cursorGlow = document.querySelector(".cursor-glow");
  let mouseX = 0,
    mouseY = 0;
  let ballX = 0,
    ballY = 0;
  const speed = 0.1;

  function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX = ballX + distX * speed;
    ballY = ballY + distY * speed;

    cursorGlow.style.left = ballX + "px";
    cursorGlow.style.top = ballY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });

  // Active Link Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
