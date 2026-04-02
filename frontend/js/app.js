const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

/* ---------------- GET MOVIES ---------------- */

async function getMovies(endpoint){

    const url = endpoint.includes("?")
    ? `${BASE}${endpoint}&api_key=${API_KEY}`
    : `${BASE}${endpoint}?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results || [];

}

/* ---------------- LOAD NORMAL SECTIONS ---------------- */

async function loadSection(endpoint, containerId){

    const container = document.getElementById(containerId);
    if(!container) return;

    const movies = await getMovies(endpoint);

    container.innerHTML = "";

    movies.slice(0,20).forEach(movie=>{

        const card = createMovieCard(movie);
        container.appendChild(card);

    });

}

/* ---------------- QUICK BUTTON SYSTEM ---------------- */

function loadQuickButtons(){

  const actions = {

    trending: () => window.location.href = "trending.html",
    top: () => window.location.href = "toprated.html",
    genre: () => window.location.href = "genres.html",
    new: () => window.location.href = "new.html",
    must: () => window.location.href = "list.html",
    list: () => window.location.href = "watchlist.html",
    trailer: () => window.location.href = "trailers.html",

    boxoffice: () => window.location.href = "boxoffice.html",
    theatre: () => window.location.href = "theatre.html",
    popular: () => window.location.href = "popular.html"

  };

  Object.keys(actions).forEach(cls => {

    const btn = document.querySelector(`.${cls}`);

    if(btn){
      btn.addEventListener("click", actions[cls]);
    }

  });

}

/* =========================
   MOVNIX HEADER MENU SCRIPT
========================= */

// Elements select karo
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const menuBtn = document.querySelector(".menu-btn");

// OPEN MENU
function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");

  // body scroll disable (premium feel)
  document.body.style.overflow = "hidden";
}

// CLOSE MENU
function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");

  // body scroll enable
  document.body.style.overflow = "auto";
}

// MENU BUTTON CLICK
menuBtn.addEventListener("click", openMenu);

// OVERLAY CLICK → CLOSE
overlay.addEventListener("click", closeMenu);

// ESC KEY → CLOSE (PRO FEATURE)
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closeMenu();
  }
});

// OPTIONAL: CLICK OUTSIDE (extra safety)
document.addEventListener("click", function(e){
  if(
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ){
    closeMenu();
  }
});

/* -------- CELEBRITY POOL -------- */

const maleCelebs = [

{name:"Shah Rukh Khan",id:500},
{name:"Salman Khan",id:501},
{name:"Aamir Khan",id:502},
{name:"Akshay Kumar",id:503},
{name:"Ajay Devgn",id:504},
{name:"Hrithik Roshan",id:505},
{name:"Ranbir Kapoor",id:506},
{name:"Ranveer Singh",id:507},
{name:"Kartik Aaryan",id:508},
{name:"Vicky Kaushal",id:509},
{name:"Rajkummar Rao",id:510},
{name:"Ayushmann Khurrana",id:511},
{name:"Shahid Kapoor",id:512},
{name:"Tiger Shroff",id:513},
{name:"Prabhas",id:514},
{name:"Allu Arjun",id:515},
{name:"Ram Charan",id:516},
{name:"Jr NTR",id:517},
{name:"Mahesh Babu",id:518},
{name:"Yash",id:519},
{name:"Dhanush",id:520},
{name:"Vijay",id:521},
{name:"Suriya",id:522},
{name:"Rajinikanth",id:523},
{name:"Kamal Haasan",id:524},
{name:"Nawazuddin Siddiqui",id:525},
{name:"Pankaj Tripathi",id:526},
{name:"Manoj Bajpayee",id:527},
{name:"Saif Ali Khan",id:528},
{name:"Varun Dhawan",id:529},
{name:"Sidharth Malhotra",id:530},
{name:"Aditya Roy Kapur",id:531},
{name:"Farhan Akhtar",id:532},
{name:"Riteish Deshmukh",id:533},
{name:"Anil Kapoor",id:534},
{name:"Suniel Shetty",id:535},
{name:"Paresh Rawal",id:536},
{name:"Jackie Shroff",id:537},
{name:"Sanjay Dutt",id:538},
{name:"Govinda",id:539}

];


const femaleCelebs = [

{name:"Deepika Padukone",id:600},
{name:"Alia Bhatt",id:601},
{name:"Katrina Kaif",id:602},
{name:"Priyanka Chopra",id:603},
{name:"Kareena Kapoor",id:604},
{name:"Kiara Advani",id:605},
{name:"Kriti Sanon",id:606},
{name:"Shraddha Kapoor",id:607},
{name:"Anushka Sharma",id:608},
{name:"Rashmika Mandanna",id:609},
{name:"Samantha Ruth Prabhu",id:610},
{name:"Tamannaah Bhatia",id:611},
{name:"Nayanthara",id:612},
{name:"Trisha Krishnan",id:613},
{name:"Pooja Hegde",id:614},
{name:"Janhvi Kapoor",id:615},
{name:"Sara Ali Khan",id:616},
{name:"Mrunal Thakur",id:617},
{name:"Tripti Dimri",id:618},
{name:"Taapsee Pannu",id:619},
{name:"Vidya Balan",id:620},
{name:"Bhumi Pednekar",id:621},
{name:"Yami Gautam",id:622},
{name:"Parineeti Chopra",id:623},
{name:"Radhika Apte",id:624},
{name:"Kajol",id:625},
{name:"Madhuri Dixit",id:626},
{name:"Aishwarya Rai",id:627},
{name:"Sonam Kapoor",id:628},
{name:"Sonakshi Sinha",id:629},
{name:"Rani Mukerji",id:630},
{name:"Preity Zinta",id:631},
{name:"Huma Qureshi",id:632},
{name:"Ileana D Cruz",id:633},
{name:"Disha Patani",id:634},
{name:"Jacqueline Fernandez",id:635},
{name:"Rakul Preet Singh",id:636},
{name:"Nushrratt Bharuccha",id:637},
{name:"Aditi Rao Hydari",id:638},
{name:"Kangana Ranaut",id:639}

];


/* -------- TEXT TEMPLATES -------- */

const bannerTexts = [

"{name}'s Top Picks for Movnix Watchlist",
"{name}'s Favorite Movies on Movnix",
"{name} Recommends These Movies",
"{name}'s Trending Watchlist",
"{name}'s Must Watch Movies",
"{name}'s Weekend Movie Picks",
"{name}'s Ultimate Watchlist",
"{name}'s Top Action Picks",
"{name}'s Best Drama Movies",
"{name}'s Personal Favorites",
"{name}'s Blockbuster Picks",
"{name}'s Movie Night Selection",
"{name}'s All Time Favorites",
"{name}'s Top Rated Movies",
"{name}'s Recommended Movies",
"{name}'s Cinema Favorites",
"{name}'s Must Watch Tonight",
"{name}'s Trending Movies",
"{name}'s Perfect Movie Night",
"{name}'s Entertainment Picks",
"{name}'s Latest Watchlist",
"{name}'s Critics Choice Picks",
"{name}'s Best of Indian Cinema",
"{name}'s Weekend Entertainment",
"{name}'s Ultimate Movie Night",
"{name}'s Cinema Gems",
"{name}'s Hidden Movie Gems",
"{name}'s Top Cinema Picks",
"{name}'s Recommended Watchlist",
"{name}'s Favorite Film Picks",
"{name}'s Movie Collection",
"{name}'s Spotlight Watchlist",
"{name}'s Cinematic Favorites",
"{name}'s Top Trending Movies",
"{name}'s Classic Movie Picks",
"{name}'s Best Film Selection",
"{name}'s Perfect Film Night",
"{name}'s Top Entertainment Picks",
"{name}'s Movie Marathon Picks",
"{name}'s Ultimate Film Picks"

];


/* -------- DAILY ROTATION SYSTEM -------- */

function getDailyCelebs(){

const today = new Date().getDate();

const list = [];

for(let i=0;i<10;i++){

let celeb;

if(i % 2 === 0){

celeb = maleCelebs[(today+i) % maleCelebs.length];

}else{

celeb = femaleCelebs[(today+i) % femaleCelebs.length];

}

list.push(celeb);

}

return list;

}

const todayCelebs = getDailyCelebs();
const celebCache = {};


let bannerIndex = 0;

function startExploreSlider(){

const img = document.getElementById("exploreImg");
const title = document.getElementById("exploreTitle");
const btn = document.getElementById("exploreBtn");
const banner = document.getElementById("exploreBanner");

if(!img || !title || !btn || !banner) return;

function updateBanner(){

banner.classList.add("slide-out");

setTimeout(()=>{

const celeb = todayCelebs[bannerIndex];

const text =
bannerTexts[Math.floor(Math.random()*bannerTexts.length)];

title.innerHTML = text.replace("{name}",
`<span class="actor-name">${celeb.name}</span>`);

/* IMAGE LOAD */

if(celebCache[celeb.name]){

img.src = celebCache[celeb.name];

}else{

fetch(`${BASE}/search/person?api_key=${API_KEY}&query=${celeb.name}`)
.then(res=>res.json())
.then(data=>{

if(data.results && data.results[0] && data.results[0].profile_path){

const url =
"https://image.tmdb.org/t/p/w780" + data.results[0].profile_path;
img.src = url;

celebCache[celeb.name] = url;

}

});

}

btn.href = "explore.html?actor=" + celeb.id;

bannerIndex++;

if(bannerIndex >= todayCelebs.length){
bannerIndex = 0;
}

banner.classList.remove("slide-out");

void banner.offsetWidth;

banner.classList.add("slide-in");

},500);

}

updateBanner();

setInterval(updateBanner,10000);

}

/* ---------------- HERO SYSTEM ---------------- */

let heroMovies = [];
let heroIndex = 0;
let heroTimer;

async function loadHero(){

const heroContainer = document.getElementById("hero");
if(!heroContainer) return;

try{

heroMovies = await getMovies(
"/discover/movie?with_origin_country=IN&primary_release_date.gte=2024-01-01&sort_by=popularity.desc"
);

heroMovies = heroMovies.filter(m => m.backdrop_path);

heroMovies = heroMovies.slice(0,20);

if(heroMovies.length === 0) return;

createHeroSlides();

startHeroSlider();

}catch(err){

console.error("Hero load error",err);

}

}

/* -------- CREATE HERO SLIDES -------- */

function createHeroSlides(){

const hero = document.getElementById("hero");
hero.innerHTML = "";

heroMovies.forEach((movie,i)=>{

if(!movie) return;

/* POSTER */

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w342"+movie.poster_path
: "https://via.placeholder.com/300x450?text=No+Poster";

/* BACKDROP */

const backdrop = movie.backdrop_path
? "https://image.tmdb.org/t/p/original"+movie.backdrop_path
: "";

/* RATING */

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

/* FAKE SOCIAL COUNTS */

const likes = Math.floor(movie.popularity * 12);
const saves = Math.floor(movie.popularity * 6);

/* CREATE SLIDE */

const slide = document.createElement("div");
slide.className="hero-slide";

if(i===0) slide.classList.add("active");
if(i===1) slide.classList.add("next");

slide.innerHTML=`

<div class="hero-video">
<img src="${backdrop}" alt="${movie.title}">
</div>

<img class="hero-poster" src="${poster}" alt="${movie.title}">

<div class="hero-info">

<h2>${movie.title}</h2>

<div class="hero-rating">
⭐ ${rating}
</div>

<p>
${movie.overview ? movie.overview : ""}
</p>

<div class="hero-buttons">

<a href="trailer.html?id=${movie.id}" class="hero-trailer-btn">
▶ Trailer
</a>

<div class="icon-btn">
❤️
</div>

<div class="hero-count">
${likes}
</div>

<div class="icon-btn">
🔖
</div>

<div class="hero-count">
${saves}
</div>

</div>

</div>

`;

hero.appendChild(slide);

});

}



function startHeroSlider(){

clearInterval(heroTimer);

heroTimer = setInterval(()=>{

const slides = document.querySelectorAll(".hero-slide");

const current = slides[heroIndex];

heroIndex++;

if(heroIndex >= slides.length){
heroIndex = 0;
}

const next = slides[heroIndex];

current.classList.remove("active");
current.classList.add("exit");

next.classList.remove("next");
next.classList.add("active");

let upcomingIndex = heroIndex + 1;

if(upcomingIndex >= slides.length){
upcomingIndex = 0;
}

slides[upcomingIndex].classList.add("next");

setTimeout(()=>{
current.classList.remove("exit");
current.classList.add("next");
},800);

},6000);

}


/* ---------------- LOAD TRAILERS ---------------- */

async function loadTrailers(){

const container = document.getElementById("trailers");
if(!container) return;

const movies1 = await getMovies("/discover/movie?with_origin_country=IN&sort_by=popularity.desc&page=1");
const movies2 = await getMovies("/discover/movie?with_origin_country=IN&sort_by=popularity.desc&page=2");

const movies = [...movies1, ...movies2];

container.innerHTML = "";

let count = 0;

for(const movie of movies){

if(count >= 30) break;

const res = await fetch(`${BASE}/movie/${movie.id}/videos?api_key=${API_KEY}`);
const data = await res.json();

const trailer = data.results.find(
v => v.type === "Trailer" && v.site === "YouTube"
);

if(!trailer) continue;

const thumb = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;

const card = document.createElement("a");
card.href = `trailer.html?id=${movie.id}`;
card.className = "trailer-card";

card.innerHTML = `

<div class="trailer-thumb">
<img src="${thumb}">
<div class="play-sm">▶</div>
</div>

<p>${movie.title}</p>

<div class="trailer-meta">
<span>⭐ ${movie.vote_average.toFixed(1)}</span>
<span>🔥 ${Math.round(movie.popularity)}</span>
</div>

`;

container.appendChild(card);

count++;

}

}


/* ---------------- TOP THIS WEEK (FINAL CLEAN + FIXED) ---------------- */

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";

let currentRegion = "IN";

// ==============================
// INIT (Lazy Load)
// ==============================
function loadTopWeek() {
  setupCountryButtons();
  setupCountrySearch();
  fetchTopThisWeek(currentRegion);
}

// ==============================
// FETCH DATA
// ==============================
async function fetchTopThisWeek(region = "IN") {
  try {
    const container = document.getElementById("top-week-container");
    if (container) {
      container.innerHTML = `<p style="color:white">Loading...</p>`;
    }

    let url;

    if (region === "WORLD") {
      url = `${BASE}/trending/movie/week?api_key=${API_KEY}`;
    } else {
      url = `${BASE}/discover/movie?api_key=${API_KEY}&region=${region}&sort_by=popularity.desc&vote_count.gte=50`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      console.error("API ERROR:", data);
      showError();
      return;
    }

    let movies = data.results
      .filter(m => m && (m.poster_path || m.backdrop_path))
      .slice(0, 10);

    // 🔥 Better sorting (real feel)
    movies.sort((a, b) => b.popularity - a.popularity);

    handleRankChange(movies, region);
    renderMovies(movies);

  } catch (err) {
    console.error("Fetch Error:", err);
    showError();
  }
}

// ==============================
// RANK CHANGE SYSTEM
// ==============================
function handleRankChange(movies, region) {
  const key = `lastWeek_${region}`;
  const oldData = JSON.parse(localStorage.getItem(key));

  if (oldData) {
    movies.forEach((movie, index) => {
      const oldIndex = oldData.findIndex(m => m.id === movie.id);

      if (oldIndex === -1) {
        movie.rankChange = "🆕";
      } else {
        const diff = oldIndex - index;
        movie.rankChange =
          diff === 0 ? "➖" : diff > 0 ? `⬆️ ${diff}` : `⬇️ ${Math.abs(diff)}`;
      }
    });
  } else {
    movies.forEach(m => (m.rankChange = "🆕"));
  }

  localStorage.setItem(key, JSON.stringify(movies));
}

// ==============================
// RENDER UI
// ==============================
function renderMovies(movies) {
  const container = document.getElementById("top-week-container");
  if (!container) return;

  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = `<p style="color:white">No data available</p>`;
    return;
  }

  movies.forEach((movie, index) => {

    const poster = movie.poster_path
      ? IMG_BASE + movie.poster_path
      : FALLBACK_POSTER;

    const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
    const userRating = userRatings[movie.id] || null;

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isSaved = watchlist.includes(movie.id);

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <div class="card">

        <div class="watchlist ${isSaved ? "active" : ""}" data-id="${movie.id}">
          ${isSaved ? "✔" : "＋"}
        </div>

        <img 
          src="${poster}" 
          alt="${movie.title}" 
          loading="lazy"
          onerror="this.src='${FALLBACK_POSTER}'"
        />

        <div class="rank">#${index + 1}</div>

        <div class="info">

          <h3>${movie.title}</h3>

          <div class="meta">

            <span class="tmdb-rating">
              ⭐ ${movie.vote_average?.toFixed(1) || "0.0"}
            </span>

            <button class="rate-btn" data-id="${movie.id}">
              🔵 ${userRating ? userRating : "Rate"}
            </button>

          </div>

          <div class="extra">
            <span>${movie.release_date?.slice(0,4) || "N/A"}</span>
            <span class="rank-change">${movie.rankChange}</span>
          </div>

        </div>

      </div>
    `;

    container.appendChild(card);
  });

  attachEvents();
}

// ==============================
// ERROR UI
// ==============================
function showError() {
  const container = document.getElementById("top-week-container");
  if (!container) return;

  container.innerHTML = `
    <p style="color:white;text-align:center;">
      Failed to load data ⚠️
    </p>
  `;
}

// ==============================
// EVENTS
// ==============================
function attachEvents() {

  // ⭐ Rating
  document.querySelectorAll(".rate-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;

      let rating = prompt("Rate this movie (1-10):");

      if (!rating) return;

      rating = Number(rating);

      if (rating < 1 || rating > 10) {
        alert("Enter rating between 1-10");
        return;
      }

      saveUserRating(id, rating);
      fetchTopThisWeek(currentRegion); // 🔥 instant update
    });
  });

  // ❤️ Watchlist
  document.querySelectorAll(".watchlist").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      toggleWatchlist(id, btn);
    });
  });
}

// ==============================
// USER RATING SYSTEM
// ==============================
function saveUserRating(id, rating) {
  let ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
  ratings[id] = rating;
  localStorage.setItem("userRatings", JSON.stringify(ratings));
}

// ==============================
// WATCHLIST
// ==============================
function toggleWatchlist(id, btn) {
  let list = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (list.includes(id)) {
    list = list.filter(item => item !== id);
    btn.innerText = "＋";
    btn.classList.remove("active");
  } else {
    list.push(id);
    btn.innerText = "✔";
    btn.classList.add("active");
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
}

// ==============================
// COUNTRY BUTTONS
// ==============================
function setupCountryButtons() {
  document.querySelectorAll(".country-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const region = btn.dataset.region;
      currentRegion = region;

      fetchTopThisWeek(region);

      document.querySelectorAll(".country-btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
    });
  });
}

// ==============================
// COUNTRY SEARCH
// ==============================
function setupCountrySearch() {
  const input = document.getElementById("countrySearchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    document.querySelectorAll(".country-btn").forEach(btn => {
      const text = btn.innerText.toLowerCase();
      btn.style.display = text.includes(value) ? "inline-flex" : "none";
    });
  });
          }



/* ---------------- CELEBRITIES ---------------- */

async function loadCelebrities(){

const container = document.getElementById("celebs");
if(!container) return;

container.innerHTML = "";

/* MERGE MALE + FEMALE LIST */

const allCelebs = [...maleCelebs, ...femaleCelebs].slice(0,50);

for(const celeb of allCelebs){

try{

const res = await fetch(
`${BASE}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(celeb.name)}`
);

const data = await res.json();

const person = data.results[0];

if(!person) continue;

const photo = person.profile_path
? "https://image.tmdb.org/t/p/w300" + person.profile_path
: "https://via.placeholder.com/300x300?text=No+Image";

/* GET REAL MOVIE COUNT */

const creditsRes = await fetch(
`${BASE}/person/${person.id}/movie_credits?api_key=${API_KEY}`
);

const creditsData = await creditsRes.json();

const titles = creditsData.cast ? creditsData.cast.length : 0;
const card = `

<a href="celebrity.html?id=${person.id}" class="celebrity-card">

<div class="celebrity-photo">
<img src="${photo}" alt="${person.name}">
</div>

<div class="celebrity-name">
${person.name}
</div>

<div class="celebrity-meta">
${person.known_for_department} • ${titles} titles
</div>

<div class="celebrity-popularity">
Popularity ${Math.round(person.popularity)}
</div>

</a>

`;

container.innerHTML += card;

}catch(err){

console.log("Celebrity load error",err);

}

}

/* SEE ALL CARD */

const seeAll = `
<a href="celebrities.html" class="celebrity-seeall">

<div class="seeall-box">
<div class="seeall-text">
See<br>All
</div>
</div>

</a>
`;

container.innerHTML += seeAll;

if(typeof activateCelebrityEffect === "function"){
activateCelebrityEffect();
}

}


/* ---------------- MOVNIX PICKS ---------------- */
async function loadMovnixPicks(){

const container = document.getElementById("movnixPicks");
if(!container) return;

const movies = await getMovies("/discover/movie?with_origin_country=IN&sort_by=vote_average.desc");

container.innerHTML = "";

movies.slice(0,12).forEach(movie=>{

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500" + movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Poster";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

const card = `

<div class="picks-card">

<img src="${poster}" alt="${movie.title}">

<div class="picks-info">

<div class="picks-rating">

⭐ ${rating}

<span class="rate-star">★</span>

</div>

<div class="picks-title-text">
${movie.title}
</div>

<a href="watch.html?id=${movie.id}" class="picks-btn">
Watch Options
</a>

<a href="watchlist.html?id=${movie.id}" class="picks-btn">
+ Watchlist
</a>

</div>

<div class="picks-actions">

<a href="trailer.html?id=${movie.id}">
▶
</a>

<a href="movie.html?id=${movie.id}" class="info-btn">
i
</a>

</div>

</div>

`;
container.innerHTML += card;

});

    }


/* ---------------- TRENDING MOVIES ---------------- */

async function loadTrending(){

const container = document.getElementById("trendingList");
if(!container) return;

/* INDIAN TRENDING MOVIES */

const movies = await getMovies(
"/discover/movie?with_origin_country=IN&primary_release_date.gte=2024-01-01&sort_by=popularity.desc&vote_count.gte=200"
);

container.innerHTML = "";

movies.slice(0,3).forEach((movie,index)=>{

/* POSTER */

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Poster";

/* RATING */

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

/* VOTES FORMAT */

const votes = movie.vote_count
? Math.floor(movie.vote_count/1000)+"K"
: "0";

/* WATCH TIME (H M S FORMAT) */

const totalSeconds = Math.floor(Math.random()*5400) + 5400;

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

const watchTime = `${hours}h ${minutes}m ${seconds}s`;

/* SMART TREND SCORE */

let trend = Math.round((movie.popularity / 10) + (movie.vote_average * 5));

if(trend > 100) trend = 100;

/* CARD HTML */

const card = `

<div class="trend-card">

<div class="rank">#${index+1}</div>

<div class="trend-poster">

<img src="${poster}" alt="${movie.title}">

<div class="watch-icon">+</div>

</div>

<div class="trend-info">

<h3>${movie.title}</h3>

<div class="meta">
${movie.release_date} • ${watchTime}
</div>

<div class="rating-row">

<div class="rating">
⭐ ${rating} (${votes})
</div>

<button class="rate-btn-small">
Rate
</button>

</div>

<div class="trend-score">
🔥 ${trend}% Trend Score
</div>

<div class="trend-actions">

<a href="trailer.html?id=${movie.id}" class="btn">
▶ Trailer
</a>

<a href="watchlist.html?id=${movie.id}" class="btn">
🔖 Watchlist
</a>

</div>

</div>

</div>

`;

container.innerHTML += card;

});

   }


/* ---------------- FAN FAVOURITES (SMART FILTER) ---------------- */

async function loadFanFavourites(){

const container = document.getElementById("fanFavourites");
if(!container) return;

container.innerHTML = "";

/* FETCH 2 PAGES */

const [page1,page2] = await Promise.all([

getMovies("/discover/movie?with_origin_country=IN&vote_count.gte=1000&sort_by=popularity.desc&page=1"),

getMovies("/discover/movie?with_origin_country=IN&vote_count.gte=1000&sort_by=popularity.desc&page=2")

]);

/* MERGE */

let movies = [...page1,...page2];

/* REMOVE LOW RATING */

movies = movies.filter(m => m.vote_average >= 6.5);

/* REMOVE DUPLICATES */

const map = new Map();

movies.forEach(m=>{
if(!map.has(m.id)){
map.set(m.id,m);
}
});

movies = [...map.values()];

/* SORT BY FAN SCORE */

movies.sort((a,b)=>{

const scoreA = (a.vote_average * 10) + a.popularity;
const scoreB = (b.vote_average * 10) + b.popularity;

return scoreB - scoreA;

});

/* TOP 20 */

movies = movies.slice(0,20);

/* RENDER */

movies.forEach(movie=>{

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Poster";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

const card = `

<div class="fan-card">

<div class="fan-poster">

<img src="${poster}" alt="${movie.title}">

<div class="watchlist-icon">+</div>

</div>

<div class="fan-info">

<div class="fan-rating">
⭐ ${rating}
</div>

<h3 class="fan-title">
${movie.title}
</h3>

<a href="watch.html?id=${movie.id}" class="fan-watch-btn">
Watch
</a>

<div class="fan-actions">

<a href="trailer.html?id=${movie.id}" class="fan-trailer">
▶ Trailer
</a>

<a href="movie.html?id=${movie.id}" class="fan-info-btn">
ⓘ
</a>

</div>

</div>

</div>

`;

container.innerHTML += card;

});

    }



/* ================= STREAMING SECTION ================= */

/* MAIN LOAD FUNCTION */
async function loadStreaming(){

const container = document.getElementById("streamRow");
if(!container) return;

container.innerHTML = "Loading...";

/* MIXED DATA SOURCES */
const endpoints = [

"/trending/movie/week",
"/discover/movie?with_origin_country=IN&sort_by=popularity.desc",
"/discover/tv?sort_by=popularity.desc",
"/discover/movie?with_genres=18",
"/discover/movie?with_genres=28",
"/discover/tv?with_genres=16"

];

try{

const results = await Promise.all(
  endpoints.map(e => getMovies(e))
);

let all = results.flat();

/* REMOVE DUPLICATES */
const uniqueMap = new Map();
all.forEach(item=>{
  if(!uniqueMap.has(item.id)){
    uniqueMap.set(item.id, item);
  }
});

all = [...uniqueMap.values()];

/* RANDOM MIX */
all.sort(()=>Math.random() - 0.5);

/* FIX TOTAL = 20 */
all = all.slice(0,20);

container.innerHTML = "";

/* CREATE CARDS */
all.forEach(movie=>{

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "https://via.placeholder.com/500x750";

const title = movie.title || movie.name || "No Title";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

const card = document.createElement("div");
card.className = "stream-card";

card.innerHTML = `

<div class="stream-poster">
  <img src="${poster}">
  <div class="stream-plus">+</div>
</div>

<div class="stream-info">

  <div class="stream-rating">⭐ ${rating}</div>

  <div class="stream-title-text">${title}</div>

  <a href="watch.html?id=${movie.id}" class="stream-btn">
    Watch now ↗
  </a>

  <div class="stream-trailer">▶ Trailer</div>

</div>

`;

container.appendChild(card);

});

/* INIT TABS AFTER LOAD */
initStreamingTabs();

}catch(err){
container.innerHTML = "Failed to load";
console.error(err);
}

}


/* ================= TAB SYSTEM ================= */

function initStreamingTabs(){

const tabs = document.querySelectorAll(".stream-tab");

tabs.forEach(tab=>{

tab.onclick = ()=>{

tabs.forEach(t=>t.classList.remove("active"));
tab.classList.add("active");

/* FUTURE: OTT FILTER ADD KAR SAKTE */
loadStreaming();

};

});

}



/* ============================= */
/* 🎬 POPULAR INTERESTS - FINAL */
/* ============================= */

/* ---------------- FETCH ---------------- */

async function getMovies(endpoint){

    try{
        const url = endpoint.includes("?")
        ? `${BASE}${endpoint}&api_key=${API_KEY}`
        : `${BASE}${endpoint}?api_key=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        return data.results || [];
    }catch(err){
        console.log("Fetch error:", err);
        return [];
    }

}


/* ---------------- SHUFFLE ---------------- */

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


/* ---------------- CARD ---------------- */

function createMovieCard(movie){

    const poster = movie.poster_path
    ? "https://image.tmdb.org/t/p/w342" + movie.poster_path
    : "https://via.placeholder.com/300x450?text=No+Poster";

    const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

    const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : (movie.first_air_date ? movie.first_air_date.split("-")[0] : "");

    /* 🔥 FIX FOR TV + MOVIES */
    const title = movie.title || movie.name || "No Title";

    const card = document.createElement("div");
    card.className = "imdb-card";

    card.innerHTML = `
        <div class="imdb-poster">
            <img src="${poster}" alt="${title}">
        </div>

        <div class="imdb-info">
            <h4>${title}</h4>
            <div class="meta">${year} • ⭐ ${rating}</div>
        </div>
    `;

    return card;
}


/* ---------------- MAIN FUNCTION ---------------- */

async function loadPopularInterests(){

    const row = document.getElementById("popularRow");
    if(!row) return;

    row.innerHTML = `<div style="color:#888;padding:10px;">Loading...</div>`;

    const sections = [

        /* 🇮🇳 INDIA */
        "/discover/movie?with_original_language=hi&sort_by=popularity.desc",
        "/discover/movie?with_original_language=ta|te|ml|kn&sort_by=popularity.desc",

        /* 🎞️ DRAMA */
        "/discover/movie?with_genres=18&sort_by=popularity.desc",

        /* 🎌 ANIME */
        "/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc",

        /* 📺 TV */
        "/discover/tv?sort_by=popularity.desc",

        /* 🔥 CORE */
        "/trending/movie/week",
        "/movie/top_rated",

        /* 🎬 GENRES */
        "/discover/movie?with_genres=28&sort_by=popularity.desc",
        "/discover/movie?with_genres=35&sort_by=popularity.desc",
        "/discover/movie?with_genres=10749&sort_by=popularity.desc",
        "/discover/movie?with_genres=27&sort_by=popularity.desc",
        "/discover/movie?with_genres=53&sort_by=popularity.desc",
        "/discover/movie?with_genres=878&sort_by=popularity.desc",
        "/discover/movie?with_genres=10751&sort_by=popularity.desc",

        /* 🌍 HOLLYWOOD */
        "/discover/movie?with_original_language=en&vote_count.gte=500&sort_by=popularity.desc",

        /* 🧠 SMART */
        "/discover/movie?vote_count.gte=2000&sort_by=vote_average.desc",
        "/discover/movie?primary_release_date.gte=2024-01-01&sort_by=popularity.desc",
        "/discover/movie?vote_average.gte=7&vote_count.gte=200&sort_by=vote_count.asc"
    ];

    try{

        /* 🚀 FETCH ALL DATA */
        const results = await Promise.all(
            sections.map(endpoint => getMovies(endpoint))
        );

        /* 🔥 MERGE ALL */
        let allMovies = results.flat();

        /* ❌ REMOVE DUPLICATES */
        let uniqueMovies = Array.from(
            new Map(allMovies.map(m => [m.id, m])).values()
        );

        /* 🎲 RANDOM MIX */
        shuffleArray(uniqueMovies);

        /* 🎬 RENDER */
        row.innerHTML = "";

        uniqueMovies.slice(0, 80).forEach(movie=>{
            row.appendChild(createMovieCard(movie));
        });

    }catch(err){
        console.log(err);
        row.innerHTML = "Failed to load 😔";
    }

}



/* ================= THEATRE SECTION FINAL ================= */

const theatres = ["PVR Cinemas", "INOX", "Cinépolis", "Miraj Cinemas", "Moviemax"];
const formats = ["2D", "3D", "IMAX"];

const getRandom = (arr) => arr[Math.floor(Math.random()*arr.length)];

const getDistance = () => (Math.random()*5 + 1).toFixed(1);

const getTime = () => {
  const times = ["10:30 AM","1:15 PM","4:15 PM","7:30 PM","10:45 PM"];
  return getRandom(times);
};

const getSeats = () => {
  const n = Math.floor(Math.random()*60);

  if(n < 15){
    return {text:`Only ${n} seats left`, class:"low"};
  } 
  else if(n < 35){
    return {text:"Filling Fast", class:"mid"};
  }
  else{
    return {text:"Available", class:"high"};
  }
};

const getBookings = () => Math.floor(Math.random()*40)+10;


/* ================= MAIN ================= */

async function loadTheatre(type="trending"){

const container = document.getElementById("theatreList");
if(!container) return;

/* LOADING UI */
container.innerHTML = `<p style="color:#aaa;padding:20px">Loading movies...</p>`;

let endpoint = "/movie/now_playing?region=IN";

try{

let data = await getMovies(endpoint);

/* SORTING */
if(type === "fast"){
  data = data.sort((a,b)=> b.popularity - a.popularity);
}
else if(type === "top"){
  data = data
    .filter(m=>m.vote_count > 200)
    .sort((a,b)=> b.vote_average - a.vote_average);
}
else{
  data = data.sort((a,b)=> b.popularity - a.popularity);
}

/* LIMIT */
const movies = data.slice(0,20);

container.innerHTML = "";

/* LOOP */
movies.forEach(movie=>{

const title = movie.title || "No Title";

/* POSTER */
const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500" + movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Image";

/* RATING */
const rating = movie.vote_average?.toFixed(1) || "0";

/* 🎯 TAG (TAB BASED) */
let tag = "🔥 Trending";
if(type === "top") tag = "⭐ Top Rated";
if(type === "fast") tag = "🎟 Fast Filling";

/* 🎭 REAL + FAKE DATA */
const theatre = getRandom(theatres);
const distance = getDistance();
const time = getTime();
const format = getRandom(formats);
const seats = getSeats();
const bookings = getBookings();

const hours = Math.floor(Math.random()*3)+1;
const mins = Math.floor(Math.random()*50)+10;

/* CARD */
const card = document.createElement("div");
card.className = "theatre-card";

card.innerHTML = `

<div class="poster-box">

  <img src="${poster}" alt="${title}" loading="lazy">

  <div class="add-btn">+</div>

  <div class="poster-overlay">

    <div class="top-row">
      <span class="rating">⭐ ${rating}</span>
      <span class="tag">${tag}</span>
    </div>

    <h3 class="movie-title">${title}</h3>

    <p class="theatre">📍 ${theatre} • ${distance} km</p>
    <p class="time">🕒 ${time} • Today</p>

    <div class="badges">
      <span class="seat ${seats.class}">${seats.text}</span>
      <span class="format">${format}</span>
    </div>

    <p class="booking">👥 Booked ${bookings} times in last hour</p>

    <div class="divider"></div>

    <p class="now-playing">
      🟢 Now Playing • ${hours}h ${mins}m left
    </p>

    <div class="actions">
      <button class="book-btn" data-id="${movie.id}">
        🎟 Book Tickets
      </button>

      <button class="info-btn" data-id="${movie.id}">
        ℹ View Info
      </button>
    </div>

  </div>

</div>

`;

/* ✅ DIRECT APPEND (NO EXTRA ROW) */
container.appendChild(card);

});

/* EVENTS INIT */
initTheatreEvents();

}catch(err){

container.innerHTML = `<p style="color:red;padding:20px">Failed to load</p>`;
console.error(err);

}

}


/* ================= EVENTS ================= */

function initTheatreEvents(){

document.querySelectorAll(".book-btn").forEach(btn=>{
btn.onclick = ()=>{
window.location.href = `booking.html?id=${btn.dataset.id}`;
};
});

document.querySelectorAll(".info-btn").forEach(btn=>{
btn.onclick = ()=>{
window.location.href = `movie.html?id=${btn.dataset.id}`;
};
});

document.querySelectorAll(".add-btn").forEach(btn=>{
btn.onclick = ()=>{
btn.classList.toggle("active");
btn.innerText = btn.innerText === "+" ? "✓" : "+";
};
});

}


/* ================= TABS ================= */

function initTheatreTabs(){

const tabs = document.querySelectorAll(".theatre-tab");

tabs.forEach(tab=>{

tab.onclick = ()=>{

tabs.forEach(t=>t.classList.remove("active"));
tab.classList.add("active");

loadTheatre(tab.dataset.tab);

};

});

}




/* ================= GLOBAL STATE ================= */

let currentBoxOfficeType = null;
let isAnimating = false;


/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadBoxOffice("india", true);
});


/* ================= BOX OFFICE LOAD ================= */

async function loadBoxOffice(type = "india", firstLoad = false){

const container = document.getElementById("boxOfficeList");
if(!container) return;

/* SAME TYPE IGNORE */
if(type === currentBoxOfficeType && !firstLoad) return;

/* PREVENT SPAM CLICK */
if(isAnimating && !firstLoad) return;

const prevType = currentBoxOfficeType;
currentBoxOfficeType = type;

/* ================= ENDPOINT ================= */

let endpoint = "";

if(type === "india"){
  endpoint = "/discover/movie?with_origin_country=IN&sort_by=popularity.desc";
}
else if(type === "world"){
  endpoint = "/trending/movie/week";
}
else{
  endpoint = "/movie/now_playing";
}


/* ================= FIRST LOAD ================= */

if(firstLoad){

container.innerHTML = `<div class="box-loading">Loading...</div>`;

try{
const data = await getMovies(endpoint);
const movies = data?.slice(0,7) || [];

container.innerHTML = "";
container.appendChild(createMovieList(movies));

initBoxOfficeEvents();

}catch(err){
container.innerHTML = `<div class="box-error">Failed to load</div>`;
}

return;
}


/* ================= ANIMATION ================= */

isAnimating = true;

/* 🔥 HEIGHT LOCK (SCROLL FIX) */
const containerHeight = container.offsetHeight;
container.style.height = containerHeight + "px";

const oldContent = container.innerHTML;

/* DIRECTION */
let direction = "right";
const order = ["india","world","opening"];

if(order.indexOf(type) < order.indexOf(prevType)){
  direction = "left";
}

/* WRAPPER */
const wrapper = document.createElement("div");
wrapper.className = "box-slider";

wrapper.innerHTML = `
  <div class="box-slide old">${oldContent}</div>
  <div class="box-slide new">${getSkeletonRows()}</div>
`;

container.innerHTML = "";
container.appendChild(wrapper);

const newSlide = wrapper.querySelector(".new");

/* POSITION */
newSlide.style.transform = direction === "right"
  ? "translateX(100%)"
  : "translateX(-100%)";


try{

const data = await getMovies(endpoint);
const movies = data?.slice(0,7) || [];

/* 🔥 DIRECT ROWS (NO EXTRA WRAPPER) */
newSlide.innerHTML = "";
newSlide.appendChild(createMovieList(movies));

/* ANIMATE */
requestAnimationFrame(()=>{

wrapper.style.transition = "transform 0.45s ease";

wrapper.style.transform = direction === "right"
  ? "translateX(-100%)"
  : "translateX(100%)";

});

/* CLEANUP */
setTimeout(()=>{

container.innerHTML = "";
container.appendChild(createMovieList(movies));

initBoxOfficeEvents();

/* 🔥 HEIGHT UNLOCK */
container.style.height = "auto";

isAnimating = false;

}, 450);

}catch(err){

container.innerHTML = `<div class="box-error">Failed to load</div>`;
console.error(err);

container.style.height = "auto";
isAnimating = false;

}

}


/* ================= CREATE MOVIE LIST ================= */

function createMovieList(movies){

const fragment = document.createDocumentFragment();

movies.forEach((movie,index)=>{

const title = movie.title || movie.name || "No Title";

const weekend = Math.floor(Math.random()*70)+10;
const total = weekend + Math.floor(Math.random()*100)+20;

const row = document.createElement("div");
row.className = "box-row";

row.innerHTML = `
<div class="box-rank">${index+1}</div>

<div class="box-add" data-id="${movie.id}">+</div>

<div class="box-info">
  <div class="box-title" data-id="${movie.id}">
    ${title}
  </div>
  <div class="box-earnings">
    $${weekend}M · Total $${total}M
  </div>
</div>

<div class="box-ticket" data-id="${movie.id}">
🎟
</div>
`;

fragment.appendChild(row);

});

return fragment;

}


/* ================= EVENTS ================= */

function initBoxOfficeEvents(){

document.querySelectorAll(".box-title").forEach(el=>{
el.onclick = ()=>{
window.location.href = `movie.html?id=${el.dataset.id}`;
};
});

document.querySelectorAll(".box-ticket").forEach(el=>{
el.onclick = ()=>{
window.location.href = `movie.html?id=${el.dataset.id}`;
};
});

document.querySelectorAll(".box-add").forEach(btn=>{
btn.onclick = ()=>{
btn.innerText = "✓";
btn.style.background = "#4da3ff";
};
});

}


/* ================= TABS ================= */

document.addEventListener("click", (e)=>{

const tab = e.target.closest(".box-tab");

if(tab){

document.querySelectorAll(".box-tab")
.forEach(t=>t.classList.remove("active"));

tab.classList.add("active");

const type = tab.dataset.tab;

loadBoxOffice(type);

}

});


/* ================= SEE FULL ================= */

document.addEventListener("click", (e)=>{

const btn = e.target.closest(".box-more");

if(btn){
window.location.href = `boxoffice.html?type=${currentBoxOfficeType}`;
}

});


/* ================= SKELETON ================= */

function getSkeletonRows(){

let skeleton = "";

for(let i=0;i<5;i++){
skeleton += `
<div class="box-row skeleton">
<div class="box-rank"></div>
<div class="box-add"></div>
<div class="box-info">
<div class="box-title"></div>
<div class="box-earnings"></div>
</div>
<div class="box-ticket"></div>
</div>
`;
}

return skeleton;

}


/* =====================================================
🎬 UPCOMING IN THEATRES (FINAL REAL SYSTEM)
Uses: TMDB (real data) + Local actions (user based)
===================================================== */


/* ================= HELPERS ================= */

function formatNumber(num){
if(!num) return "—";
if(num >= 1000000) return (num/1000000).toFixed(1)+"M";
if(num >= 1000) return (num/1000).toFixed(1)+"K";
return Math.floor(num);
}


/* ================= STORAGE ================= */

function getStorage(key){
return JSON.parse(localStorage.getItem(key)) || {};
}

function setStorage(key, value){
localStorage.setItem(key, JSON.stringify(value));
}

function toggleLike(id){
let data = getStorage("likes");
data[id] = !data[id];
setStorage("likes", data);
return data[id];
}

function toggleSave(id){
let data = getStorage("saved");
data[id] = !data[id];
setStorage("saved", data);
return data[id];
}

function toggleNotify(id){
let data = getStorage("notify");
data[id] = !data[id];
setStorage("notify", data);
return data[id];
}


/* ================= GLOBAL FETCH ================= */

async function getUpcomingMovies(){

const countries = ["US","IN","KR","JP","FR","GB"];
const categories = [
"/movie/upcoming",
"/movie/now_playing",
"/trending/movie/week"
];

let allMovies = [];

for(const country of countries){
for(const cat of categories){
try{
const data = await getMovies(`${cat}?region=${country}&language=en-US`);
allMovies = allMovies.concat(data);
}catch(e){}
}
}

/* REMOVE DUPLICATES */
const unique = {};
allMovies.forEach(m => unique[m.id] = m);

return Object.values(unique);
}


/* ================= LAZY LOAD FUNCTION ================= */

function initLazyImages(container){

const images = container.querySelectorAll(".lazy-img");

const observer = new IntersectionObserver((entries, obs)=>{
entries.forEach(entry => {

if(entry.isIntersecting){
const img = entry.target;

img.src = img.dataset.src;

obs.unobserve(img);
}

});
},{ rootMargin: "100px" });

images.forEach(img => {

/* ✅ OBSERVE */
observer.observe(img);

/* ✅ 🔥 FORCE LOAD IF ALREADY IN VIEW */
const rect = img.getBoundingClientRect();

if(rect.top < window.innerHeight){
img.src = img.dataset.src;
observer.unobserve(img);
}

});

}

/* ================= LOAD SECTION ================= */

async function loadUpcomingSection(){

const container = document.getElementById("upcomingList");
if(!container) return;

container.innerHTML = "Loading...";

try{

let movies = await getUpcomingMovies();

/* FILTER VALID */
movies = movies.filter(m => m.poster_path || m.backdrop_path);

/* TAKE MORE FOR TRAILER FILTER */
movies = movies.slice(0, 80);

container.innerHTML = "";

const row = document.createElement("div");
row.className = "upcoming-row";


/* LOOP */
for(const movie of movies){

/* ---------- TRAILER ---------- */
let trailerKey = "";

try{
const res = await fetch(
`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
);
const data = await res.json();

const trailer = data.results.find(
v => v.type === "Trailer" && v.site === "YouTube"
);

if(trailer) trailerKey = trailer.key;

}catch(e){}


/* ---------- IMAGE (SMART FALLBACK) ---------- */
const thumb = trailerKey
? `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`
: movie.backdrop_path
? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
: `https://image.tmdb.org/t/p/w500${movie.poster_path}`;


/* ---------- DATE ---------- */
const date = movie.release_date
? new Date(movie.release_date).toLocaleDateString("en-US",{
month:"short",day:"2-digit",year:"numeric"
}).toUpperCase()
: "COMING SOON";


/* ---------- GENRES ---------- */
const genreMap = {
28:"Action",12:"Adventure",16:"Animation",35:"Comedy",
18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",
10749:"Romance",878:"Sci-Fi"
};

const genres = (movie.genre_ids || [])
.slice(0,3)
.map(id => genreMap[id] || "")
.join(" • ");


/* ---------- REAL STATS (TMDB BASED) ---------- */
const likesCount = formatNumber(movie.vote_count);
const interestCount = formatNumber(movie.popularity * 1000);


/* ---------- STATE ---------- */
const liked = getStorage("likes")[movie.id];
const saved = getStorage("saved")[movie.id];
const notified = getStorage("notify")[movie.id];


/* ---------- CARD ---------- */
const card = document.createElement("div");
card.className = "upcoming-card";

card.innerHTML = `

<div class="thumb-box">

<img data-src="${thumb}" class="lazy-img">

<div class="play-btn" data-id="${movie.id}">▶</div>

<div class="duration">${trailerKey ? "▶ Trailer" : "Coming Soon"}</div>

</div>

<div class="upcoming-info">

<div class="date">📅 ${date}</div>

<div class="title-row">
<h3>${movie.title}</h3>

<div class="add-btn ${saved ? "active":""}" data-id="${movie.id}">
${saved ? "✓" : "+"}
</div>
</div>

<p class="genres">${genres}</p>

<div class="rating">⭐ ${movie.vote_average?.toFixed(1) || "—"}</div>

<div class="stats">

<span class="like-btn ${liked ? "active":""}" data-id="${movie.id}">
❤️ ${likesCount}
</span>

<span class="save-btn ${saved ? "active":""}" data-id="${movie.id}">
🔖 ${interestCount}
</span>

</div>

<button class="remind-btn ${notified ? "active":""}" data-id="${movie.id}">
${notified ? "Notified ✓" : "Remind Me"}
</button>

</div>

`;

row.appendChild(card);

/* STOP AT 25 */
if(row.children.length >= 25) break;

}

container.appendChild(row);

/* ✅ LAZY LOAD INIT */
initLazyImages(container);

}catch(err){
container.innerHTML = "Failed to load";
console.error(err);
}

}


/* ================= EVENTS ================= */

document.addEventListener("click", function(e){

/* ▶ TRAILER PAGE */
if(e.target.closest(".play-btn")){
const id = e.target.closest(".play-btn").dataset.id;
window.location.href = `trailer.html?id=${id}`;
}


/* ❤️ LIKE */
if(e.target.closest(".like-btn")){
const btn = e.target.closest(".like-btn");
const id = btn.dataset.id;

const liked = toggleLike(id);
btn.classList.toggle("active", liked);
}


/* 🔖 SAVE */
if(e.target.closest(".save-btn") || e.target.closest(".add-btn")){
const btn = e.target.closest(".save-btn") || e.target.closest(".add-btn");
const id = btn.dataset.id;

const saved = toggleSave(id);

btn.classList.toggle("active", saved);
btn.innerText = saved ? "✓" : "+";
}


/* 🔔 NOTIFY */
if(e.target.closest(".remind-btn")){
const btn = e.target.closest(".remind-btn");
const id = btn.dataset.id;

const active = toggleNotify(id);
btn.classList.toggle("active", active);
btn.innerText = active ? "Notified ✓" : "Remind Me";
}

});

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

    console.log("NEWS DATA:", data);

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

    // fallback to raw
    if (!articles.length) articles = rawArticles;

    // final fallback (never blank)
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

    /* CATEGORY */

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

    /* COUNTRY */

    if (text.includes("india")) {
      currentCountry = "in";
    }
    else if (text.includes("global")) {
      currentCountry = "us";
    }

    loadNewsSection();
  }

});

/* ===================================================== */
/* 🔥 MOVNIX FINAL SECTION - FULL JS (CINEMATIC UI)       */
/* ===================================================== */

/* ===============================
   🚀 INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initButtons();
  initSubscribe();
  initScrollAnimations();
  initPosterEffects();
});

/* ===============================
   🎬 HERO BUTTONS
================================ */
function initButtons() {

  const exploreBtn = document.querySelector(".primary");
  const trendingBtn = document.querySelector(".secondary");

  // 🎥 Explore Movies
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "movies.html";
    });
  }

  // 🔥 Scroll to next section
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

    // 👉 Future: API connect here
    showToast("🚀 Subscribed Successfully!");
    input.value = "";
  }
}

/* ===============================
   🍞 TOAST NOTIFICATION
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
   🎞 POSTER HOVER EFFECT
================================ */
function initPosterEffects() {

  const posters = document.querySelectorAll(".movnix-posters img");

  posters.forEach((poster, index) => {

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
   🌟 PAGE LOAD FADE
================================ */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


/* ---------------- MOVIE CARD SYSTEM ---------------- */

function createMovieCard(movie){

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500" + movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Poster";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

const card = document.createElement("div");
card.className = "movie-card";

card.innerHTML = `

<div class="poster-box">

<img src="${poster}" alt="${movie.title}">

<div class="rating-badge">⭐ ${rating}</div>

</div>

<div class="movie-info">

<h4>${movie.title}</h4>

<a href="movie.html?id=${movie.id}" class="info-btn">
View Details
</a>

</div>

`;

return card;

}
    
/* ---------------- SMART LAZY LOAD SYSTEM ---------------- */

const lazySections = [];

/* REGISTER SECTION */

function registerSection(id, loader){

lazySections.push({
id: id,
loader: loader,
loaded: false
});

}

/* LAZY LOAD ENGINE */

function lazyLoadSections(){

function checkSections(){

lazySections.forEach(section => {

if(section.loaded) return;

const el = document.getElementById(section.id);

if(!el) return;

const pos = el.getBoundingClientRect().top;

if(pos < window.innerHeight){

section.loader();

section.loaded = true;

}

});

}

window.addEventListener("scroll", checkSections);

checkSections();

}


/* ---------------- REGISTER ALL SECTIONS ---------------- */

registerSection("quickButtons", loadQuickButtons);

registerSection("trailers", loadTrailers);

registerSection("top-week-section", loadTopWeek);

registerSection("celebs", loadCelebrities);

registerSection("movnixPicks", loadMovnixPicks);

registerSection("trendingList", loadTrending);

registerSection("fanFavourites", loadFanFavourites);

registerSection("streamingSection", loadStreaming);

registerSection("popularInterests", loadPopularInterests);

registerSection("theatreReleases", loadTheatre);

registerSection("boxOfficeSection", () => loadBoxOffice("india"));

registerSection("upcomingTheatres", loadUpcomingSection);

registerSection("newsSection", loadNewsSection);

/* ---------------- INIT ---------------- */

async function init(){

await loadHero();          // Hero section
startExploreSlider();      // Explore banner

lazyLoadSections();        // Lazy load system start

}

init();


function activateCelebrityEffect(){

const row = document.querySelector(".celebrity-row");
if(!row) return;

const cards = row.querySelectorAll(".celebrity-card");

function updateActive(){

const center = row.scrollLeft + row.offsetWidth / 2;

let closest = null;
let closestOffset = Infinity;

cards.forEach(card=>{

const cardCenter = card.offsetLeft + card.offsetWidth/2;
const diff = Math.abs(center - cardCenter);

if(diff < closestOffset){
closestOffset = diff;
closest = card;
}

});

cards.forEach(c=>c.classList.remove("active"));

if(closest){
closest.classList.add("active");
}

}

row.addEventListener("scroll",updateActive);

updateActive();

                      }
