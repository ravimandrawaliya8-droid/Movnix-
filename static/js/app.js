const API_KEY = "45fe7a9c4583e4374d3981bb55c39222;
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

    loadSection("/trending/movie/day","trending");

    loadSection("/movie/popular","popular");

    loadSection("/movie/top_rated","toprated");

    loadSection("/movie/upcoming","upcoming");

}

init();
