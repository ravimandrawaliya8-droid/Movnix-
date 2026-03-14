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
"https://image.tmdb.org/t/p/w500" + data.results[0].profile_path;

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

for(const movie of movies.slice(0,15)){

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

if(typeof activateCelebrityEffect === "function"){
activateCelebrityEffect();
}

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

let heroTimer;

function startHeroSlider(){

clearInterval(heroTimer);

heroTimer = setInterval(()=>{

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

    startExploreSlider();

    loadTrailers();

    loadTopWeek();

    loadCelebrities();

    loadMovnixPicks();


}

init();
