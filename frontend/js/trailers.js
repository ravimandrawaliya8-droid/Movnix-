/* ================= CONFIG ================= */

const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";
const BACKDROP = "https://image.tmdb.org/t/p/original";

/* ================= URL BUILDER ================= */

function buildURL(endpoint) {
  if (endpoint.includes("?")) {
    return `${BASE_URL}${endpoint}&api_key=${API_KEY}`;
  } else {
    return `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  }
}

/* ================= FETCH ================= */

async function fetchData(endpoint) {
  try {
    const res = await fetch(buildURL(endpoint));
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

/* ================= HERO ================= */

async function loadHeroTrailer() {
  try {
    const data = await fetchData("/trending/movie/week");

    if (!data || !data.results) return;

    // backdrop wali movie lo
    const movie = data.results.find(m => m.backdrop_path);

    if (!movie) return;

    const hero = document.querySelector(".hero");

    hero.style.backgroundImage = `
      linear-gradient(to top, rgba(0,0,0,0.85), transparent),
      url(${BACKDROP + movie.backdrop_path})
    `;

    // Text
    document.querySelector(".hero-title").innerText = movie.title || movie.name;
    document.querySelector(".hero-desc").innerText = movie.overview || "No description available";

    // Trailer fetch
    const vid = await fetchData(`/movie/${movie.id}/videos`);

    if (!vid || !vid.results) return;

    const trailer = vid.results.find(v => v.type === "Trailer");

    if (trailer) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1`;
      iframe.allow = "autoplay; encrypted-media";
      iframe.className = "hero-video";

      const box = document.querySelector(".hero-video-box");
      box.innerHTML = ""; // reset
      box.appendChild(iframe);
    }

  } catch (e) {
    console.log("Hero Error:", e);
  }
}

/* ================= CARD ================= */

function createCard(movie) {

  const poster = movie.poster_path
    ? IMG + movie.poster_path
    : "https://via.placeholder.com/300x450?text=No+Image";

  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${poster}" loading="lazy"/>
      <div class="card-info">
        <h4>${movie.title || movie.name}</h4>
        <p>
          ${(movie.release_date || movie.first_air_date || "2024").slice(0,4)}
          • ⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  `;
}

/* ================= RENDER ================= */

async function renderSection(endpoint, containerClass) {
  const data = await fetchData(endpoint);

  if (!data || !data.results) return;

  const container = document.querySelector(containerClass);

  if (!container) return;

  container.innerHTML = data.results
    .filter(m => m.poster_path) // clean UI
    .slice(0, 12)
    .map(createCard)
    .join("");

  enableSlider(container);
}

/* ================= SLIDER ================= */

function enableSlider(container) {

  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  });

}

/* ================= SEARCH ================= */

function initSearch() {

  const input = document.querySelector("#searchInput");
  const container = document.querySelector(".search-results");

  if (!input || !container) return;

  input.addEventListener("input", async (e) => {

    const query = e.target.value.trim();

    if (query.length < 2) {
      container.innerHTML = "";
      return;
    }

    const data = await fetchData(`/search/movie?query=${query}`);

    if (!data || !data.results) return;

    container.innerHTML = data.results
      .filter(m => m.poster_path)
      .slice(0, 10)
      .map(createCard)
      .join("");
  });
}

/* ================= FILTER ================= */

function initFilters() {

  const genreSelect = document.querySelector("#genreFilter");

  if (!genreSelect) return;

  genreSelect.addEventListener("change", async () => {

    const genre = genreSelect.value;

    if (!genre) return;

    const data = await fetchData(`/discover/movie?with_genres=${genre}`);

    if (!data || !data.results) return;

    document.querySelector(".trending-container").innerHTML =
      data.results
        .filter(m => m.poster_path)
        .slice(0, 12)
        .map(createCard)
        .join("");
  });
}

/* ================= INIT ================= */

window.addEventListener("DOMContentLoaded", () => {

  loadHeroTrailer();

  renderSection("/trending/movie/week", ".trending-container");
  renderSection("/movie/now_playing", ".latest-container");
  renderSection("/movie/top_rated", ".toprated-container");

  initSearch();
  initFilters();

});
