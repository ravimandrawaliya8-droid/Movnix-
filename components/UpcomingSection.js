/* =====================================================
🎬 UPCOMING IN THEATRES (FINAL REAL SYSTEM)
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

/* ================= FETCH ================= */

async function getUpcomingMovies(){

const API_KEY = "YOUR_TMDB_API_KEY"; // 👈 replace

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
const res = await fetch(
`https://api.themoviedb.org/3${cat}?api_key=${API_KEY}&region=${country}`
);
const data = await res.json();

allMovies = allMovies.concat(data.results || []);
}catch(e){}
}
}

/* REMOVE DUPLICATES */
const unique = {};
allMovies.forEach(m => unique[m.id] = m);

return Object.values(unique);
}

/* ================= LAZY LOAD ================= */

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

observer.observe(img);

const rect = img.getBoundingClientRect();

if(rect.top < window.innerHeight){
img.src = img.dataset.src;
observer.unobserve(img);
}

});

}

/* ================= MAIN LOAD ================= */

async function loadUpcomingSection(){

const container = document.getElementById("upcomingList");
if(!container) return;

container.innerHTML = "Loading...";

try{

let movies = await getUpcomingMovies();

movies = movies.filter(m => m.poster_path || m.backdrop_path);
movies = movies.slice(0, 80);

container.innerHTML = "";

const row = document.createElement("div");
row.className = "upcoming-row";

for(const movie of movies){

let trailerKey = "";

try{
const res = await fetch(
`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=YOUR_TMDB_API_KEY`
);
const data = await res.json();

const trailer = data.results.find(
v => v.type === "Trailer" && v.site === "YouTube"
);

if(trailer) trailerKey = trailer.key;

}catch(e){}

/* IMAGE */
const thumb = trailerKey
? `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`
: movie.backdrop_path
? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
: `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

/* DATE */
const date = movie.release_date
? new Date(movie.release_date).toLocaleDateString("en-US",{
month:"short",day:"2-digit",year:"numeric"
}).toUpperCase()
: "COMING SOON";

/* GENRES */
const genreMap = {
28:"Action",12:"Adventure",16:"Animation",35:"Comedy",
18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",
10749:"Romance",878:"Sci-Fi"
};

const genres = (movie.genre_ids || [])
.slice(0,3)
.map(id => genreMap[id] || "")
.join(" • ");

/* STATS */
const likesCount = formatNumber(movie.vote_count);
const interestCount = formatNumber(movie.popularity * 1000);

/* STATE */
const liked = getStorage("likes")[movie.id];
const saved = getStorage("saved")[movie.id];
const notified = getStorage("notify")[movie.id];

/* CARD */
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

if(row.children.length >= 25) break;

}

container.appendChild(row);

initLazyImages(container);

}catch(err){
container.innerHTML = "Failed to load";
console.error(err);
}

}

/* ================= EVENTS ================= */

function initUpcomingEvents(){

document.addEventListener("click", function(e){

if(e.target.closest(".play-btn")){
const id = e.target.closest(".play-btn").dataset.id;
window.location.href = `trailer.html?id=${id}`;
}

if(e.target.closest(".like-btn")){
const btn = e.target.closest(".like-btn");
const id = btn.dataset.id;

const liked = toggleLike(id);
btn.classList.toggle("active", liked);
}

if(e.target.closest(".save-btn") || e.target.closest(".add-btn")){
const btn = e.target.closest(".save-btn") || e.target.closest(".add-btn");
const id = btn.dataset.id;

const saved = toggleSave(id);

btn.classList.toggle("active", saved);
btn.innerText = saved ? "✓" : "+";
}

if(e.target.closest(".remind-btn")){
const btn = e.target.closest(".remind-btn");
const id = btn.dataset.id;

const active = toggleNotify(id);
btn.classList.toggle("active", active);
btn.innerText = active ? "Notified ✓" : "Remind Me";
}

});

}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
loadUpcomingSection();
initUpcomingEvents();
});
