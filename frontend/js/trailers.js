const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

// ===== ELEMENT =====
const container = document.getElementById("movies-container");

// ===== FETCH MOVIES =====
async function fetchMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();

    console.log("DATA:", data);

    displayMovies(data.results);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

// ===== DISPLAY MOVIES =====
function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const poster = movie.poster_path
      ? IMG + movie.poster_path
      : "https://via.placeholder.com/300x450?text=No+Image";

    const title = movie.title || movie.name;
    const rating = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/A";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <div class="poster">
        <img src="${poster}" alt="${title}" />
        <div class="overlay">
          <button class="play-btn" data-id="${movie.id}">▶ Play</button>
        </div>
      </div>

      <div class="info">
        <h3>${title}</h3>
        <p>⭐ ${rating}</p>

        <div class="buttons">
          <button class="details-btn" data-id="${movie.id}">
            Details
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  addEvents();
}

// ===== EVENTS =====
function addEvents() {
  // PLAY TRAILER
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;

      const res = await fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();

      if (data.results.length > 0) {
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer"
        );

        if (trailer) {
          window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
          );
        } else {
          alert("Trailer not available 😢");
        }
      } else {
        alert("No video found 😢");
      }
    });
  });

  // DETAILS
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;

      const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      const movie = await res.json();

      alert(`
Title: ${movie.title}
Rating: ${movie.vote_average}
Release: ${movie.release_date}

${movie.overview}
      `);
    });
  });
}

// ===== INIT =====
fetchMovies();
