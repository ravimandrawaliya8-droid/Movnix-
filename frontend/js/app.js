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

/* ---------------- TOP THIS WEEK ---------------- */

 async function loadTopWeek(){

const container = document.getElementById("topweek");
if(!container) return;

container.innerHTML = "";

/* GET WEEKLY TRENDING */

const trending = await getMovies("/trending/movie/week");

/* YEAR FILTER (last 3 years) */

const currentYear = new Date().getFullYear();
const minYear = currentYear - 3;

/* FILTER MOVIES */

let filtered = trending.filter(movie => {

if(!movie.release_date) return false;

const year = parseInt(movie.release_date.split("-")[0]);

return (
year >= minYear &&
["hi","ta","te","ml","kn"].includes(movie.original_language)
);

});

/* FALLBACK (INDIAN POPULAR MOVIES) */

if(filtered.length < 10){

const fallback = await getMovies(
"/discover/movie?with_origin_country=IN&primary_release_date.gte=2023-01-01&sort_by=popularity.desc"
);

filtered = [...filtered, ...fallback];

}

/* REMOVE DUPLICATES */

const map = new Map();

filtered.forEach(movie=>{
if(!map.has(movie.id)){
map.set(movie.id,movie);
}
});

const unique = [...map.values()];

/* SORT BY POPULARITY */

unique.sort((a,b)=> b.popularity - a.popularity);

/* FINAL TOP 10 */

const top10 = unique.slice(0,10);

/* RENDER */

top10.forEach((movie,index)=>{

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Poster";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

const card = `

<div class="movie-card">

<div class="poster-box">

<img src="${poster}" alt="${movie.title}">

<div class="rating-badge">⭐ ${rating}</div>

<div class="rank">#${index+1}</div>

</div>

<div class="movie-info">

<h4>${movie.title}</h4>

<div class="genre">Top This Week</div>

</div>

</div>

`;

container.innerHTML += card;

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


/* =====================================================
   POPULAR INTERESTS (IMDB STYLE CATEGORY CARDS)
===================================================== */

const interestCategories = [

{title:"Horror",genre:"27"},
{title:"Comedy",genre:"35"},
{title:"Action",genre:"28"},
{title:"Crime & Mystery",genre:"80,9648"},
{title:"Love Stories",genre:"10749"},
{title:"Family Movies",genre:"10751"},
{title:"Mind Blowing Thrillers",genre:"53"},
{title:"South Mass Movies",genre:"28"},
{title:"Real Story Movies",genre:"18"},
{title:"Patriotic Movies",genre:"36"},
{title:"Sad Love Stories",genre:"10749"},
{title:"Weekend Movies",genre:"28"},
{title:"Late Night Thrillers",genre:"53"},
{title:"Adventure Movies",genre:"12"},
{title:"Sci-Fi Movies",genre:"878"},
{title:"Romantic Comedy",genre:"35,10749"},
{title:"Epic Blockbusters",genre:"28"},
{title:"Hidden Gems",genre:"18"}

];


/* LOAD INTEREST SECTION */

async function loadPopularInterests(){

const container = document.getElementById("popularInterests");
if(!container) return;

container.innerHTML = "";

for(const cat of interestCategories){

try{

const url =
`${BASE}/discover/movie?api_key=${API_KEY}&with_genres=${cat.genre}&page=1`;

const res = await fetch(url);
const data = await res.json();

if(!data.results) continue;

const movies = data.results.slice(0,4);
const count = data.total_results || 0;

/* RANDOM POSTER COUNT (1-4) */

const posterCount = Math.floor(Math.random()*4)+1;

let posters = movies.slice(0,posterCount);

/* CREATE COLLAGE */

let collageHTML = "";

posters.forEach(movie=>{

if(!movie.poster_path) return;

const poster =
"https://image.tmdb.org/t/p/w500" + movie.poster_path;

collageHTML += `<img src="${poster}" alt="${movie.title}">`;

});

/* CARD HTML */

const card = `

<div class="interest-card">

<div class="poster-collage">

${collageHTML}

</div>

<div class="interest-info">

<a href="explore.html?genre=${cat.genre}" class="interest-title">
${cat.title}
</a>

<div class="movie-count">
${formatMovieCount(count)} movies
</div>

<a href="explore.html?genre=${cat.genre}" class="see-list">
See list
</a>

</div>

</div>

`;

container.innerHTML += card;

}catch(err){

console.log("Interest load error",err);

}

}

}


/* FORMAT MOVIE COUNT */

function formatMovieCount(num){

if(num > 1000){

return (num/1000).toFixed(1)+"K";

}

return num;

    }


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

registerSection("trailers", loadTrailers);

registerSection("topweek", loadTopWeek);

registerSection("celebs", loadCelebrities);

registerSection("movnixPicks", loadMovnixPicks);

registerSection("trendingList", loadTrending);

registerSection("fanFavourites", loadFanFavourites);

registerSection("popularInterests", loadPopularInterests);

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
