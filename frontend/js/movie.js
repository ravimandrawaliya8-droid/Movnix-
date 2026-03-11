const IMG = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w342";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");


async function loadMovie(){

const res = await fetch(
`${BASE}/movie/${movieId}?api_key=${API_KEY}`
);

const movie = await res.json();

const hero = document.getElementById("movie-hero");

const backdrop = movie.backdrop_path
? IMG + movie.backdrop_path
: "";

const poster = movie.poster_path
? POSTER + movie.poster_path
: "";

hero.innerHTML = `
<div class="movie-banner" style="background-image:url('${backdrop}')">

<div class="movie-banner-content">

<img src="${poster}" class="movie-poster">

<div class="movie-info">

<h1>${movie.title}</h1>

<div class="rating">
⭐ ${movie.vote_average.toFixed(1)}
</div>

<div class="meta">
${movie.release_date} • ${movie.runtime} min
</div>

<button class="hero-btn"
onclick="window.location.href='trailer.html?id=${movie.id}'">
Watch Trailer
</button>

</div>

</div>

</div>
`;

document.getElementById("overview").innerText = movie.overview;

}


async function loadCast(){

const res = await fetch(
`${BASE}/movie/${movieId}/credits?api_key=${API_KEY}`
);

const data = await res.json();

const container = document.getElementById("cast");

data.cast.slice(0,10).forEach(actor=>{

const photo = actor.profile_path
? "https://image.tmdb.org/t/p/w185"+actor.profile_path
: "https://via.placeholder.com/100";

const card = document.createElement("div");

card.className = "cast-card";

card.innerHTML = `
<img src="${photo}">
<div>${actor.name}</div>
`;

container.appendChild(card);

});

}


async function loadSimilar(){

const res = await fetch(
`${BASE}/movie/${movieId}/similar?api_key=${API_KEY}`
);

const data = await res.json();

const container = document.getElementById("similar");

data.results.slice(0,12).forEach(movie=>{

const card = createMovieCard(movie);

container.appendChild(card);

});

}


loadMovie();
loadCast();
loadSimilar();
