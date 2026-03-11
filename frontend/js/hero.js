const HERO_BACKDROP = "https://image.tmdb.org/t/p/original";
const HERO_POSTER = "https://image.tmdb.org/t/p/w342";

let heroMovies = [];
let heroIndex = 0;

function renderHero(movie){

const hero = document.getElementById("hero");

const backdrop = movie.backdrop_path
? HERO_BACKDROP + movie.backdrop_path
: "";

const poster = movie.poster_path
? HERO_POSTER + movie.poster_path
: "";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "N/A";

hero.innerHTML = `

<div class="hero-card">

<img class="hero-poster" src="${poster}">

<div class="hero-video">

<img src="${backdrop}">

<div class="play">▶</div>

<div class="hero-info">

<h2>${movie.title}</h2>

<p>
${movie.overview ? movie.overview.slice(0,120) : ""}
</p>

<div class="reactions">

<span>⭐ ${rating}</span>

</div>

</div>

</div>

</div>

`;

}


function startHeroSlider(){

setInterval(()=>{

heroIndex++;

if(heroIndex >= heroMovies.length){
heroIndex = 0;
}

renderHero(heroMovies[heroIndex]);

},7000);

}
