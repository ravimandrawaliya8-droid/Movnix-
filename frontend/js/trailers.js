/* ================= CONFIG ================= */

const API_KEY = "45fe7a9c4583e4374d3981bb55c39222"; // <-- yaha apni key daalo
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

/* ================= FETCH ================= */

async function fetchData(endpoint) {
  const res = await fetch(`${BASE}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results || [];
}

/* ================= MOVIE CARD ================= */

function createMovieCard(movie) {
  const poster = movie.poster_path
    ? IMG + movie.poster_path
    : "https://via.placeholder.com/300x450?text=No+Image";

  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${poster}" alt="${movie.title}">
    <h4>${movie.title}</h4>
  `;

  return card;
}

/* ================= SHOW MOVIES ================= */

function showMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });
}

/* ================= TRAILER ================= */

async function getTrailer(movieId) {
  try {
    const res = await fetch(
      `${BASE}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();

    const trailer = data.results.find(
      v => v.type === "Trailer" && v.site === "YouTube"
    );

    return trailer
      ? `https://www.youtube.com/watch?v=${trailer.key}`
      : null;

  } catch {
    return null;
  }
}

/* ================= SHOW TRAILERS ================= */

async function showTrailers(movies) {
  const container = document.getElementById("trailers");
  container.innerHTML = "";

  for (let movie of movies.slice(0, 10)) {

    const trailerUrl = await getTrailer(movie.id);

    if (!trailerUrl) continue;

    const poster = movie.backdrop_path
      ? IMG + movie.backdrop_path
      : IMG + movie.poster_path;

    const card = document.createElement("a");
    card.href = trailerUrl;
    card.target = "_blank";
    card.className = "trailer-card";

    card.innerHTML = `
      <div class="trailer-thumb">
        <img src="${poster}">
        <div class="play-sm">▶</div>
      </div>
      <p>${movie.title}</p>
    `;

    container.appendChild(card);
  }
}

/* ================= HERO ================= */

async function loadHero() {
  const movies = await fetchData("/trending/movie/day");

  if (!movies.length) return;

  const movie = movies[0];

  document.querySelector(".hero-title").textContent = movie.title;
  document.querySelector(".hero-desc").textContent =
    movie.overview || "No description available.";

  // Background
  if (movie.backdrop_path) {
    document.querySelector(".hero").style.background = `
      url(${IMG + movie.backdrop_path}) center/cover no-repeat
    `;
  }

  // Trailer in hero
  const trailer = await getTrailer(movie.id);

  if (trailer) {
    document.querySelector(".hero-video-box").innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${trailer.split("v=")[1]}"
        frameborder="0"
        allowfullscreen>
      </iframe>
    `;
  }
}

/* ================= LOAD ALL ================= */

async function loadAll() {

  const trending = await fetchData("/trending/movie/day");
  const latest = await fetchData("/movie/now_playing");
  const topRated = await fetchData("/movie/top_rated");

  showMovies(trending, "trending");
  showMovies(latest, "latest");
  showMovies(topRated, "toprated");

  showTrailers(trending);

  loadHero();
}

/* ================= SEARCH ================= */

async function searchMovies() {

  const query = document.getElementById("searchInput").value;

  if (!query) return;

  const res = await fetch(
    `${BASE}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await res.json();

  showMovies(data.results, "search");
}

/* ================= FILTER ================= */

async function applyFilters() {

  const lang = document.getElementById("languageFilter").value;
  const year = document.getElementById("yearFilter").value;
  const genre = document.getElementById("genreFilter").value;

  let url = `/discover/movie?`;

  if (lang) url += `with_original_language=${lang}&`;
  if (year) url += `primary_release_year=${year}&`;
  if (genre) url += `with_genres=${genre}&`;

  const res = await fetch(`${BASE}${url}api_key=${API_KEY}`);
  const data = await res.json();

  showMovies(data.results, "search");
}

/* ================= EVENTS ================= */

document.querySelector(".search-btn").addEventListener("click", searchMovies);

document.getElementById("searchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchMovies();
});

document.getElementById("languageFilter").addEventListener("change", applyFilters);
document.getElementById("yearFilter").addEventListener("change", applyFilters);
document.getElementById("genreFilter").addEventListener("change", applyFilters);

/* ================= INIT ================= */

loadAll();
