const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";
const BACKDROP = "https://image.tmdb.org/t/p/original";

/* ================= FETCH FUNCTION ================= */

async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  return await res.json();
}

/* ================= HERO TRAILER ================= */

async function loadHeroTrailer() {
  const data = await fetchData("/trending/movie/week");
  const movie = data.results[0];

  const hero = document.querySelector(".hero");

  hero.style.backgroundImage = `
    linear-gradient(to top, rgba(0,0,0,0.8), transparent),
    url(${BACKDROP + movie.backdrop_path})
  `;

  hero.querySelector(".hero-title").innerText = movie.title;
  hero.querySelector(".hero-desc").innerText = movie.overview;

  // Fetch trailer video
  const vid = await fetchData(`/movie/${movie.id}/videos`);
  const trailer = vid.results.find(v => v.type === "Trailer");

  if (trailer) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1`;
    iframe.className = "hero-video";

    document.querySelector(".hero-video-box").appendChild(iframe);
  }
}

/* ================= CREATE CARD ================= */

function createCard(movie) {
  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${IMG + movie.poster_path}" />
      <div class="card-info">
        <h4>${movie.title}</h4>
        <p>${movie.release_date?.slice(0,4) || "2024"} • ${movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  `;
}

/* ================= RENDER SECTION ================= */

async function renderSection(endpoint, containerClass) {
  const data = await fetchData(endpoint);

  const container = document.querySelector(containerClass);
  container.innerHTML = data.results
    .slice(0, 10)
    .map(createCard)
    .join("");

  slider(container);
}

/* ================= SLIDER ================= */

function slider(container) {
  let scrollAmount = 0;

  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollAmount += e.deltaY;
    container.scrollLeft = scrollAmount;
  });
}

/* ================= SEARCH ================= */

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value;

  if (query.length < 2) return;

  const data = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  ).then(res => res.json());

  const container = document.querySelector(".search-results");

  container.innerHTML = data.results
    .slice(0, 8)
    .map(createCard)
    .join("");
});

/* ================= FILTERS ================= */

const genreSelect = document.querySelector("#genreFilter");

genreSelect.addEventListener("change", async () => {
  const genre = genreSelect.value;

  const data = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
  ).then(res => res.json());

  document.querySelector(".trending-container").innerHTML =
    data.results.map(createCard).join("");
});

/* ================= AUTO LOAD ================= */

window.addEventListener("DOMContentLoaded", () => {

  loadHeroTrailer();

  renderSection("/trending/movie/week", ".trending-container");
  renderSection("/movie/now_playing", ".latest-container");
  renderSection("/movie/top_rated", ".toprated-container");

});
