const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadTrailer(){

const res = await fetch(`${BASE}/movie/${movieId}/videos?api_key=${API_KEY}`);

const data = await res.json();

const trailer = data.results.find(v => v.type === "Trailer");

if(!trailer) return;

const player = document.getElementById("player");

player.innerHTML = `
<iframe
width="100%"
height="420"
src="https://www.youtube.com/embed/${trailer.key}"
frameborder="0"
allowfullscreen>
</iframe>
`;

}

loadTrailer();
