"use client";

import { useEffect } from "react";

/* ===================================================== */
/* 🔥 MOVNIX FINAL SECTION - FULL JS (CINEMATIC UI)       */
/* ===================================================== */

export default function MovnixHero(){

useEffect(()=>{

initButtons();
initSubscribe();
initScrollAnimations();
initPosterEffects();

/* PAGE LOAD */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

},[]);


/* ===============================
   🎬 HERO BUTTONS
================================ */
function initButtons() {

  const exploreBtn = document.querySelector(".primary");
  const trendingBtn = document.querySelector(".secondary");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "movies.html";
    });
  }

  if (trendingBtn) {
    trendingBtn.addEventListener("click", () => {
      document.querySelector(".subscribe-box")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }
}

/* ===============================
   📩 SUBSCRIBE SYSTEM
================================ */
function initSubscribe() {

  const input = document.querySelector(".subscribe-input input");
  const btn = document.querySelector(".subscribe-input button");

  if (!input || !btn) return;

  btn.addEventListener("click", handleSubscribe);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSubscribe();
  });

  function handleSubscribe() {
    const email = input.value.trim();

    if (!email || !email.includes("@")) {
      showToast("❌ Enter valid email");
      return;
    }

    showToast("🚀 Subscribed Successfully!");
    input.value = "";
  }
}

/* ===============================
   🍞 TOAST
================================ */
function showToast(message) {

  const toast = document.createElement("div");
  toast.className = "movnix-toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ===============================
   ✨ SCROLL ANIMATION
================================ */
function initScrollAnimations() {

  const elements = document.querySelectorAll(
    ".movnix-left, .movnix-posters, .subscribe-box, .movnix-footer"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

/* ===============================
   🎞 POSTER EFFECT
================================ */
function initPosterEffects() {

  const posters = document.querySelectorAll(".movnix-posters img");

  posters.forEach((poster) => {

    poster.addEventListener("mousemove", (e) => {

      const rect = poster.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 20;
      const rotateX = ((y / rect.height) - 0.5) * -20;

      poster.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.1)
      `;
    });

    poster.addEventListener("mouseleave", () => {
      poster.style.transform = "scale(1)";
    });

  });
}


/* ===============================
   🎨 UI JSX (IMPORTANT)
================================ */

return (
<section className="movnix-section">

  <div className="movnix-left">
    <h1>Unlimited Movies, Shows & More</h1>
    <p>Watch anywhere. Cancel anytime.</p>

    <div className="buttons">
      <button className="primary">Explore Movies</button>
      <button className="secondary">Trending Now</button>
    </div>
  </div>

  <div className="movnix-posters">
    <img src="/p1.jpg" />
    <img src="/p2.jpg" />
    <img src="/p3.jpg" />
  </div>

  {/* SUBSCRIBE */}
  <div className="subscribe-box">
    <h3>Stay Updated</h3>

    <div className="subscribe-input">
      <input type="text" placeholder="Enter your email" />
      <button>Subscribe</button>
    </div>
  </div>

  {/* FOOTER */}
  <div className="movnix-footer">
    <p>© 2026 Movnix. All rights reserved.</p>
  </div>

</section>
);

  }
