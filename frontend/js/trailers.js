const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/";

/* ---------------- SAFE FETCH ---------------- */

async function getMovies(endpoint){
  try{
    const url = endpoint.includes("?")
      ? `${BASE}${endpoint}&api_key=${API_KEY}`
      : `${BASE}${endpoint}?api_key=${API_KEY}`;

    const res = await fetch(url);

    if(!res.ok){
      console.error("API Error:", res.status);
      return [];
    }

    const data = await res.json();
    return data.results || [];

  }catch(err){
    console.error("Fetch error:", err);
    return [];
  }
}

/* ---------------- IMAGE FIX ---------------- */

function getPoster(path, size="w500"){
  if(!path){
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMG}${size}${path}`;
}

/* ---------------- MOVIE CARD ---------------- */

function createMovieCard(movie){

  const poster = getPoster(movie.poster_path);

  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${poster}" alt="${movie.title}"
      onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'">

    <h4>${movie.title}</h4>
  `;

  return card;
}

/* ---------------- LOAD SECTION ---------------- */

async function loadSection(endpoint, containerId){

  const container = document.getElementById(containerId);
  if(!container) return;

  container.innerHTML = "Loading...";

  const movies = await getMovies(endpoint);

  container.innerHTML = "";

  if(movies.length === 0){
    container.innerHTML = "No data found";
    return;
  }

  movies.slice(0,20).forEach(movie=>{
    container.appendChild(createMovieCard(movie));
  });

}

/* ---------------- TRAILERS (FAST VERSION) ---------------- */

async function loadTrailers(){

  const container = document.getElementById("trailers");
  if(!container) return;

  container.innerHTML = "Loading trailers...";

  try{

    const movies = await getMovies("/discover/movie?sort_by=popularity.desc");

    container.innerHTML = "";

    const promises = movies.slice(0,15).map(async movie => {

      const res = await fetch(`${BASE}/movie/${movie.id}/videos?api_key=${API_KEY}`);
      const data = await res.json();

      const trailer = data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if(!trailer) return null;

      return {
        movie,
        key: trailer.key
      };

    });

    const results = await Promise.all(promises);

    results.filter(Boolean).forEach(item => {

      const thumb = `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`;

      const card = document.createElement("a");
      card.href = `trailer.html?id=${item.movie.id}`;
      card.className = "trailer-card";

      card.innerHTML = `
        <div class="trailer-thumb">
          <img src="${thumb}">
          <div class="play-sm">▶</div>
        </div>
        <p>${item.movie.title}</p>
      `;

      container.appendChild(card);

    });

  }catch(err){
    console.error("Trailer error:", err);
    container.innerHTML = "Failed to load trailers";
  }

}

/* ---------------- HERO FIX ---------------- */

async function loadHero(){

  const hero = document.getElementById("hero");
  if(!hero) return;

  const movies = await getMovies(
    "/discover/movie?sort_by=popularity.desc"
  );

  hero.innerHTML = "";

  movies.slice(0,5).forEach(movie=>{

    const backdrop = getPoster(movie.backdrop_path, "original");
    const poster = getPoster(movie.poster_path);

    const slide = document.createElement("div");
    slide.className = "hero-slide";

    slide.innerHTML = `
      <img class="bg" src="${backdrop}">
      <div class="hero-content">
        <img src="${poster}">
        <h2>${movie.title}</h2>
        <p>${movie.overview || "No description available"}</p>
      </div>
    `;

    hero.appendChild(slide);

  });

}

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {

  loadSection("/trending/movie/week", "trending");
  loadTrailers();
  loadHero();

});
