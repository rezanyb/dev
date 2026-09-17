/* =========================================================
   REZA NYB — INTERACTIONS
   Small vanilla-JS layer: theme, scroll state, reveal and nav.
   ========================================================= */
(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  const header = document.querySelector(".site-header");
  const backTop = document.getElementById("backTop");
  const year = document.getElementById("year");
  const nav = document.getElementById("mainNav");

  // Current year.
  if (year) year.textContent = new Date().getFullYear();

  // Theme preference: saved choice -> system preference.
  const savedTheme = localStorage.getItem("reza-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (systemDark ? "dark" : "light"));

  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    if (themeIcon) themeIcon.className = dark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("reza-theme", next);
  });

  // Header + back-to-top state.
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    header?.classList.toggle("scrolled", scrolled);
    backTop?.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Lightweight scroll reveal.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Close the mobile Bootstrap menu after selecting a section.
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && nav?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
})();
