// ===============================
// CONFIG
// ===============================
const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

/* ===============================
   🎬 FETCH MOVIE
=============================== */

async function getMovieDetails(id){
  const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
  return await res.json();
}

/* ===============================
   🎬 LOAD HERO (FIXED SMALL UI)
=============================== */

async function loadMovie(){

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if(!id) return;

  const movie = await getMovieDetails(id);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`  // 🔥 smaller image
    : "https://via.placeholder.com/300x450?text=No+Image";

  document.getElementById("movieSection").innerHTML = `
    
    <!-- HEADER -->
    <div class="header-bar">
      <h2>Booking</h2>
    </div>

    <!-- HERO -->
    <div class="movie-hero-mini">

      <img class="movie-poster-mini" src="${poster}" />

      <div class="movie-info-mini">
        <h3>${movie.title}</h3>
        <p class="meta">${movie.release_date || ""}</p>
        <p class="overview">
          ${movie.overview || "No description available"}
        </p>
      </div>

    </div>

  `;
}

/* ===============================
   🚀 LAZY LOAD PLACEHOLDER SECTIONS
=============================== */

function createLazySection(id){
  const section = document.createElement("div");
  section.id = id;
  section.className = "lazy-section";

  section.innerHTML = `
    <div class="placeholder">
      Loading ${id}...
    </div>
  `;

  document.getElementById("app").appendChild(section);
}

/* ===============================
   🚀 INIT LAZY SECTIONS
=============================== */

function initSections(){

  // 🔥 tu future me yaha add karega
  const sections = [
    "movieSection",     // already used
    "theatreSection",
    "seatSection",
    "paymentSection"
  ];

  const app = document.getElementById("app");

  app.innerHTML = ""; // reset

  sections.forEach(id=>{
    const div = document.createElement("div");
    div.id = id;
    div.className = "section";
    app.appendChild(div);
  });
}

/* ===============================
   👀 INTERSECTION OBSERVER
=============================== */

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      const id = entry.target.id;

      // 🔥 ONLY HERO LOAD
      if(id === "movieSection"){
        loadMovie();
      }

      // 🔥 FUTURE HOOKS (empty)
      if(id === "theatreSection"){
        entry.target.innerHTML = `<p>👉 Theatre section yaha add karega tu</p>`;
      }

      if(id === "seatSection"){
        entry.target.innerHTML = `<p>👉 Seat section yaha add karega tu</p>`;
      }

      if(id === "paymentSection"){
        entry.target.innerHTML = `<p>👉 Payment section yaha add karega tu</p>`;
      }

      observer.unobserve(entry.target);
    }
  });

},{ threshold:0.2 });

/* ===============================
   🚀 INIT APP
=============================== */

window.addEventListener("DOMContentLoaded", ()=>{

  initSections();

  // observe all sections
  document.querySelectorAll(".section").forEach(sec=>{
    observer.observe(sec);
  });

});
