const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/original";

/* =========================
   GET MOVIE ID
========================= */
function getMovieId(){
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/* =========================
   FETCH DATA
========================= */
async function getMovieFull(id){
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`
  );
  return await res.json();
}

let MOVIE = null;

/* =========================
   🚀 SMART LAZY LOAD SYSTEM (PRO)
========================= */

const lazySections = [];

function registerSection(id, loader){
  lazySections.push({
    id,
    loader,
    loaded: false
  });
}

function initLazyLoad(){

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {

      if(!entry.isIntersecting) return;

      const section = lazySections.find(s => s.id === entry.target.id);

      if(section && !section.loaded){
        section.loader();
        section.loaded = true;
        observer.unobserve(entry.target);
      }

    });
  },{
    rootMargin: "100px"
  });

  lazySections.forEach(section=>{
    const el = document.getElementById(section.id);
    if(el){
      observer.observe(el);
    }
  });

}

/* =========================
   HERO (IMDB STYLE)
========================= */
function loadHero(){

  const hero = document.getElementById("movie-hero");
  if(!hero || !MOVIE) return;

  const bg = MOVIE.backdrop_path
    ? IMG + MOVIE.backdrop_path
    : "";

  hero.innerHTML = `
    <div class="hero-bg">
      <img src="${bg}">
    </div>

    <div class="hero-overlay"></div>

    <div class="hero-main">

      <h1>${MOVIE.title}</h1>

      <div class="meta">
        ${MOVIE.release_date?.slice(0,4)} • 
        ${MOVIE.adult ? "A" : "U/A"} • 
        ${Math.floor(MOVIE.runtime/60)}h ${MOVIE.runtime%60}m
      </div>

      <button class="play-btn" onclick="playTrailer(${MOVIE.id})">
        ▶ Play Trailer
      </button>

    </div>

    <div class="rating">
      ⭐ ${MOVIE.vote_average.toFixed(1)}
    </div>
  `;
}

/* =========================
   OVERVIEW
========================= */
function loadOverview(){

  const el = document.getElementById("movie-overview");
  if(!el || !MOVIE) return;

  const poster = MOVIE.poster_path
    ? IMG + MOVIE.poster_path
    : "";

  const genres = MOVIE.genres.map(g=>`<span>${g.name}</span>`).join("");

  el.innerHTML = `
    <div class="overview-wrap">

      <img src="${poster}" class="poster">

      <div class="info">

        <div class="genres">${genres}</div>

        <p>${MOVIE.overview || "No description"}</p>

        <div class="rating-box">
          ⭐ ${MOVIE.vote_average.toFixed(1)} / 10
          <button>Rate</button>
        </div>

      </div>

    </div>
  `;
}

/* =========================
   DETAILS
========================= */
function loadDetails(){

  const el = document.getElementById("movie-details");
  if(!el || !MOVIE) return;

  const director = MOVIE.credits.crew.find(c=>c.job==="Director");
  const writers = MOVIE.credits.crew
    .filter(c=>c.job==="Writer" || c.job==="Screenplay")
    .slice(0,2);

  const cast = MOVIE.credits.cast.slice(0,3);

  el.innerHTML = `
    <p><b>Director:</b> ${director?.name || "N/A"}</p>
    <p><b>Writers:</b> ${writers.map(w=>w.name).join(", ")}</p>
    <p><b>Stars:</b> ${cast.map(c=>c.name).join(", ")}</p>
  `;
}

/* =========================
   STREAMING
========================= */
function loadStreaming(){

  const el = document.getElementById("movie-streaming");
  if(!el || !MOVIE) return;

  const providers = MOVIE["watch/providers"]?.results?.IN;

  if(!providers){
    el.innerHTML = "No streaming info";
    return;
  }

  const list = providers.flatrate || [];

  el.innerHTML = `
    <div class="stream-row">
      ${
        list.map(p=>`
          <img src="https://image.tmdb.org/t/p/w92${p.logo_path}">
        `).join("")
      }
    </div>
  `;
}

/* =========================
   REVIEWS STATS
========================= */
function loadReviews(){

  const el = document.getElementById("movie-reviews");
  if(!el || !MOVIE) return;

  el.innerHTML = `
    <div class="review-box">
      <div>
        <h3>${MOVIE.vote_count}</h3>
        <p>Reviews</p>
      </div>

      <div>
        <h3>${Math.round(MOVIE.popularity)}</h3>
        <p>Popularity</p>
      </div>

      <div>
        <h3>${Math.round(MOVIE.vote_average*10)}</h3>
        <p>Score</p>
      </div>
    </div>
  `;
}

/* =========================
   TRAILER
========================= */
async function playTrailer(id){

  const res = await fetch(`${BASE}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await res.json();

  const t = data.results.find(v=>v.type==="Trailer");

  if(t){
    window.open(`https://youtube.com/watch?v=${t.key}`);
  }else{
    alert("No trailer");
  }
}

/* =========================
   WATCHLIST
========================= */
function loadWatchlist(){

  const btn = document.getElementById("watchlist-btn");
  if(!btn || !MOVIE) return;

  let list = JSON.parse(localStorage.getItem("watchlist")) || [];

  function update(){
    btn.innerText = list.includes(MOVIE.id)
      ? "✓ Added"
      : "+ Add to Watchlist";
  }

  btn.onclick = ()=>{
    if(list.includes(MOVIE.id)){
      list = list.filter(id=>id!==MOVIE.id);
    }else{
      list.push(MOVIE.id);
    }
    localStorage.setItem("watchlist", JSON.stringify(list));
    update();
  };

  update();
}

/* =========================
   REGISTER SECTIONS (🔥 MAIN POWER)
========================= */

registerSection("movie-overview", loadOverview);
registerSection("movie-details", loadDetails);
registerSection("movie-streaming", loadStreaming);
registerSection("movie-reviews", loadReviews);
registerSection("watchlist-btn", loadWatchlist);

/* =========================
   INIT
========================= */
async function init(){

  const id = getMovieId();
  if(!id) return;

  MOVIE = await getMovieFull(id);

  loadHero();        // always instant
  initLazyLoad();    // बाकी lazy

}

init();
