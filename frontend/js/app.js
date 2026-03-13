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

/* ---------------- EXPLORE SLIDER ---------------- */

const banners = [

{
title:"Movie Promotion",
img:"https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
link:"trailers.html"
},

{
title:"Celebrity Interview",
img:"https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
link:"celebrities.html"
},

{
title:"Brand Collaboration",
img:"https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
link:"#"
},

{
title:"Upcoming Trailer",
img:"https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
link:"trailers.html"
},

{
title:"OTT Release",
img:"https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
link:"#"
},

{
title:"Award Winners",
img:"https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
link:"#"
},

{
title:"Behind The Scenes",
img:"https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
link:"#"
},

{
title:"Celebrity Products",
img:"https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
link:"#"
},

{
title:"New Star Spotlight",
img:"https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
link:"celebrities.html"
},

{
title:"Movnix Picks",
img:"https://image.tmdb.org/t/p/original/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg",
link:"discover.html"
}

];

let bannerIndex = 0;

function startBannerSlider(){

const img = document.getElementById("bannerImg");
const title = document.getElementById("bannerTitle");
const link = document.getElementById("bannerLink");

function updateBanner(){

const banner = banners[bannerIndex];

img.src = banner.img;
title.innerText = banner.title;
link.href = banner.link;

bannerIndex++;

if(bannerIndex >= banners.length){
bannerIndex = 0;
}

}

updateBanner();

setInterval(updateBanner,10000);

}

/* ---------------- LOAD HERO ---------------- */

let heroMovies = [];

async function loadHero(){

    const heroContainer = document.getElementById("hero");
    if(!heroContainer) return;

    heroMovies = await getMovies("/discover/movie?with_origin_country=IN&sort_by=popularity.desc");
    heroMovies = heroMovies.slice(0,25);

    if(heroMovies.length === 0) return;

    if(typeof renderHero === "function"){
        renderHero(heroMovies[0]);
    }

    if(typeof startHeroSlider === "function"){
        startHeroSlider();
    }

}

/* ---------------- LOAD TRAILERS ---------------- */

async function loadTrailers(){

const container = document.getElementById("trailers");
if(!container) return;

const movies = await getMovies("/discover/movie?with_origin_country=IN&sort_by=popularity.desc");

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

const seeAll = document.createElement("a");
seeAll.href = "trailers.html";
seeAll.className = "see-all-card";
seeAll.innerText = "See All";

container.appendChild(seeAll);

}

/* ---------------- TOP THIS WEEK ---------------- */

async function loadTopWeek(){

    const container = document.getElementById("topweek");
    if(!container) return;

    const movies = await getMovies("/discover/movie?with_origin_country=IN&sort_by=popularity.desc");

    container.innerHTML = "";

    movies.slice(0,10).forEach((movie,index)=>{

        const poster = movie.poster_path
        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
        : "https://via.placeholder.com/500x750?text=No+Poster";

        const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "0";

        const popularity = Math.min(movie.popularity/5,100);

        const card = `
        <div class="movie-card">

            <div class="poster-box">

                <img src="${poster}" alt="${movie.title}">

                <div class="rating-badge">⭐ ${rating}</div>

                <div class="rank">#${index+1}</div>

            </div>

            <div class="movie-info">

                <h4>${movie.title}</h4>

                <div class="genre">Trending</div>

                <div class="popularity">
                    <div class="bar" style="width:${popularity}%"></div>
                </div>

                <div class="actions">

                    <button class="rate-btn">⭐ Rate</button>

                    <a href="trailer.html?id=${movie.id}" class="trailer-btn">
                    ▶ Trailer
                    </a>

                    <a href="watchlist.html?id=${movie.id}" class="watchlist-btn">
                    Watchlist
                    </a>

                </div>

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

const res = await fetch(`${BASE}/person/popular?api_key=${API_KEY}`);
const data = await res.json();

const people = data.results;

container.innerHTML = "";

people.slice(0,15).forEach(person=>{

const photo = person.profile_path
? "https://image.tmdb.org/t/p/w300" + person.profile_path
: "https://via.placeholder.com/300x300?text=No+Image";

const titles = person.known_for ? person.known_for.length : 0;

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

});

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

activateCelebrityEffect();

    }

/* ---------------- HERO RENDER ---------------- */

let heroIndex = 0;

function renderHero(movie){

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w342" + movie.poster_path
: "https://via.placeholder.com/300x450?text=No+Poster";

const backdrop = movie.backdrop_path
? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
: "";

document.getElementById("heroPoster").src = poster;

document.getElementById("heroBackdrop").innerHTML =
`<img src="${backdrop}" alt="${movie.title}">`;

document.getElementById("heroTitle").innerText = movie.title;

document.getElementById("heroOverview").innerText =
movie.overview ? movie.overview.slice(0,140)+"..." : "";

}

/* ---------------- HERO SLIDER ---------------- */

function startHeroSlider(){

setInterval(()=>{

heroIndex++;

if(heroIndex >= heroMovies.length){
heroIndex = 0;
}

renderHero(heroMovies[heroIndex]);

},6000);

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

<div class="picks-actions">

<span>▶ Trailer</span>
<span>ℹ Info</span>

</div>

</div>

</div>

`;

container.innerHTML += card;

});

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
    
/* ---------------- INIT ---------------- */

async function init(){

    await loadHero();

    startBannerSlider();

    loadTrailers();

    loadTopWeek();

    loadCelebrities();

    loadMovnixPicks();


}

init();
