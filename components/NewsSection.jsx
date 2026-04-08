"use client";

import { useEffect } from "react";

/* =====================================================
📰 TOP NEWS SECTION (FINAL PRO CLEAN)
===================================================== */

const NEWS_KEY = "d1d3a3da2bb2e737fbb7053536e1398a";

let currentCountry = "in";
let currentQuery = "general";

let isLoadingNews = false;

/* ================= FETCH ================= */

async function fetchNews(country = "in", query = "general") {
  try {

    let url;

    if (query === "general") {
      url = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&apikey=${NEWS_KEY}`;
    } else {
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${NEWS_KEY}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.errors) return [];

    return data.articles || [];

  } catch (e) {
    console.error("Fetch Error:", e);
    return [];
  }
}

/* ================= FILTER ================= */

function filterEntertainment(articles) {
  return articles.filter(a => {
    const text = (a.title + (a.description || "")).toLowerCase();

    return text.includes("movie") ||
           text.includes("film") ||
           text.includes("actor") ||
           text.includes("actress") ||
           text.includes("bollywood") ||
           text.includes("hollywood") ||
           text.includes("celebrity") ||
           text.includes("netflix") ||
           text.includes("series") ||
           text.includes("ott");
  });
}

/* ================= LOAD ================= */

async function loadNewsSection() {

  if (isLoadingNews) return;
  isLoadingNews = true;

  const section = document.getElementById("newsSection");
  if (!section) {
    isLoadingNews = false;
    return;
  }

  const hero = section.querySelector(".news-hero");
  const list = section.querySelector(".news-list");

  if (!hero || !list) {
    isLoadingNews = false;
    return;
  }

  list.innerHTML = "Loading...";

  try {

    let rawArticles = await fetchNews(currentCountry, currentQuery);
    let articles = filterEntertainment(rawArticles);

    if (!articles.length) articles = rawArticles;

    if (!articles.length) {
      articles = [
        {
          title: "Latest Movie Updates",
          description: "Demo fallback news",
          image: "https://via.placeholder.com/800x500",
          source: { name: "Movnix" },
          url: "#"
        },
        {
          title: "Celebrity News Update",
          image: "https://via.placeholder.com/100",
          source: { name: "Movnix" },
          url: "#"
        }
      ];
    }

    /* ⭐ HERO */
    const top = articles[0];

    hero.innerHTML = `
      <img 
        src="${top.image || 'https://via.placeholder.com/800x500'}"
        onerror="this.onerror=null;this.src='https://via.placeholder.com/800x500'"
      >

      <div class="overlay"></div>

      <div class="hero-content">
        <span class="tag">⭐ TOP STORY</span>
        <h3>${top.title}</h3>
        <p>${top.description || ''}</p>

        <div class="hero-footer">
          <span>🗞 ${top.source?.name || 'News'}</span>
          <button class="read-btn" data-url="${top.url}">
            Read More →
          </button>
        </div>
      </div>
    `;

    /* 📃 LIST */
    list.innerHTML = "";

    articles.slice(1, 8).forEach(news => {

      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <img 
          src="${news.image || 'https://via.placeholder.com/100'}"
          onerror="this.onerror=null;this.src='https://via.placeholder.com/100'"
        >

        <div>
          <h4>${news.title}</h4>
          <p>${news.source?.name || 'News'}</p>
        </div>

        <span class="arrow">→</span>
      `;

      card.dataset.url = news.url;

      list.appendChild(card);

    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "Failed to load news";
  }

  isLoadingNews = false;
}

/* ================= EVENTS ================= */

function initNewsEvents(){

document.addEventListener("click", function (e) {

  if (e.target.closest(".news-card")) {
    const url = e.target.closest(".news-card").dataset.url;
    if (url) window.open(url, "_blank");
  }

  if (e.target.closest(".read-btn")) {
    const url = e.target.closest(".read-btn").dataset.url;
    if (url) window.open(url, "_blank");
  }

  if (e.target.closest(".news-pills button")) {

    const btn = e.target.closest("button");

    document.querySelectorAll(".news-pills button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const text = btn.innerText.toLowerCase();

    if (text.includes("movies")) {
      currentQuery = "movie OR film OR box office OR release";
    }
    else if (text.includes("celebs")) {
      currentQuery = "celebrity OR actor OR actress OR bollywood";
    }
    else if (text.includes("tv")) {
      currentQuery = "tv show OR web series OR netflix";
    }
    else if (text.includes("top")) {
      currentQuery = "general";
    }

    if (text.includes("india")) {
      currentCountry = "in";
    }
    else if (text.includes("global")) {
      currentCountry = "us";
    }

    loadNewsSection();
  }

});
}

/* ================= COMPONENT ================= */

export default function NewsSection(){

useEffect(()=>{
loadNewsSection();
initNewsEvents();
},[]);

return (
<section id="newsSection">

  <h2>📰 Top News</h2>

  {/* FILTER PILLS (same system) */}
  <div className="news-pills">
    <button className="active">Top</button>
    <button>Movies</button>
    <button>Celebs</button>
    <button>TV</button>
    <button>India</button>
    <button>Global</button>
  </div>

  <div className="news-hero"></div>

  <div className="news-list"></div>

</section>
);
}
