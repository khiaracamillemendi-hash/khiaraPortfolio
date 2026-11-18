/* =========================================================
   KHIARA CAMILLE MENDI - PORTFOLIO SCRIPT
   ========================================================= */

/* ---------- 1. MOBILE MENU (hamburger) ---------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close the menu after tapping a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

/* ---------- 2. HIGHLIGHT ACTIVE NAV LINK WHILE SCROLLING ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  // The section that crosses the line 40% down the screen is "active"
  const line = window.scrollY + window.innerHeight * 0.4;
  let current = sections[0].id;
  sections.forEach((section) => {
    if (section.offsetTop <= line) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

/* ---------- 3. FADE-IN ON SCROLL ---------- */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible")); // old browsers
}

/* ---------- 4. STAR FIELD (Skills section) ---------- */
const starBox = document.getElementById("stars");
const STAR_COUNT = 90; // change this number for more or fewer stars
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement("span");
  const size = Math.random() * 2 + 1;
  star.className = "star";
  star.style.width = star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 4 + "s";
  starBox.appendChild(star);
}

/* ---------- 5. CONTACT FORM VALIDATION ---------- */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

// Option A (used): mailto - opens the visitor's email app, no backend needed.
const MY_EMAIL = "Khiaracamillemendi@pcb.edu.ph";

// Option B (Formspree): create a form at formspree.io, then paste your URL here
// and uncomment the fetch() block inside the submit handler below.
// const FORMSPREE_URL = "https://formspree.io/f/your-form-id";

function showError(input, message) {
  const field = input.closest(".field");
  field.classList.toggle("invalid", Boolean(message));
  document.getElementById(input.id + "Error").textContent = message;
  input.setAttribute("aria-invalid", Boolean(message));
}

function validate() {
  const name = form.name;
  const email = form.email;
  const message = form.message;
  let ok = true;

  if (name.value.trim() === "") { showError(name, "Please enter your name."); ok = false; }
  else showError(name, "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") { showError(email, "Please enter your email."); ok = false; }
  else if (!emailPattern.test(email.value.trim())) { showError(email, "Please enter a valid email, like name@example.com."); ok = false; }
  else showError(email, "");

  if (message.value.trim() === "") { showError(message, "Please write a message."); ok = false; }
  else showError(message, "");

  return ok;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMsg.hidden = true;
  if (!validate()) return;

  // Build the mailto link with the visitor's details
  const subject = encodeURIComponent("Portfolio message from " + form.name.value.trim());
  const body = encodeURIComponent(
    form.message.value.trim() + "\n\nFrom: " + form.name.value.trim() + " (" + form.email.value.trim() + ")"
  );
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;

  successMsg.hidden = false;
  form.reset();
});

// Clear an error as soon as the visitor starts fixing it
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => showError(input, ""));
});

/* ---------- 6. FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
