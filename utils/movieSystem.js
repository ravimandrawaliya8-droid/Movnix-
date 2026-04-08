"use client";

/* ---------------- MOVIE CARD SYSTEM ---------------- */

export function createMovieCard(movie){

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

export function registerSection(id, loader){

lazySections.push({
id: id,
loader: loader,
loaded: false
});

}

/* LAZY LOAD ENGINE */

export function lazyLoadSections(){

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

export function registerAllSections({
  loadQuickButtons,
  loadTrailers,
  loadTopWeek,
  loadCelebrities,
  loadMovnixPicks,
  loadTrending,
  loadFanFavourites,
  loadStreaming,
  loadPopularInterests,
  loadTheatre,
  loadBoxOffice,
  loadUpcomingSection,
  loadNewsSection
}){

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

}


/* ---------------- INIT ---------------- */

export async function initApp({
  loadHero,
  startExploreSlider,
  loaders
}){

await loadHero();          // Hero section
startExploreSlider();      // Explore banner

registerAllSections(loaders);

lazyLoadSections();        // Lazy load system start

}


/* ---------------- CELEBRITY EFFECT ---------------- */

export function activateCelebrityEffect(){

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
