const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

async function getMovies(endpoint){

    const res = await fetch(`${BASE}${endpoint}?api_key=${API_KEY}`);

    const data = await res.json();

    return data.results;

}

async function loadSection(endpoint, containerId){

    const movies = await getMovies(endpoint);

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    movies.slice(0,20).forEach(movie=>{

        const card = createMovieCard(movie);

        container.appendChild(card);

    });

}

async function init(){

    heroMovies = await getMovies("/trending/movie/day");

    renderHero(heroMovies[0]);

    startHeroSlider();

    loadTrailers();

    loadTopWeek();

    loadSection("/trending/movie/day","trending");

    loadSection("/movie/popular","popular");

    loadSection("/movie/top_rated","toprated");

    loadSection("/movie/upcoming","upcoming");

}

async function loadTrailers(){

    const movies = await getMovies("/trending/movie/day");

    const container = document.getElementById("trailers");

    container.innerHTML = "";

    for(const movie of movies.slice(0,10)){

        const res = await fetch(`${BASE}/movie/${movie.id}/videos?api_key=${API_KEY}`);

        const data = await res.json();

        const trailer = data.results.find(v => v.type === "Trailer");

        if(trailer){

            const card = createTrailerCard(trailer, movie);

            container.appendChild(card);

        }

    }

            }


async function loadTopWeek(){

    const movies = await getMovies("/trending/movie/week");

    const container = document.getElementById("topweek");

    container.innerHTML = "";

    movies.slice(0,10).forEach((movie,index)=>{

        const poster =
        "https://image.tmdb.org/t/p/w500" + movie.poster_path;

        const rating = movie.vote_average.toFixed(1);

        const popularity = Math.min(movie.popularity/5,100);

        const card = `
        <div class="movie-card">

        <div class="poster-box">

        <img src="${poster}">

        <div class="rating-badge">⭐ ${rating}</div>

        <div class="rank">#${index+1}</div>

        </div>

        <div class="movie-info">

        <h4>${movie.title}</h4>

        <div class="genre">🔥 Trending</div>

        <div class="popularity">
        <div class="bar" style="width:${popularity}%"></div>
        </div>

        <div class="actions">

        <button class="rate-btn">⭐ Rate</button>

        <a href="trailer.html?id=${movie.id}" class="trailer-btn">▶ Trailer</a>

        </div>

        </div>

        </div>
        `;

        container.innerHTML += card;

    });

                }

init();

