const API_KEY="45fe7a9c4583e4374d3981bb55c39222";
const BASE="https://api.themoviedb.org/3";

const params=new URLSearchParams(location.search);
const type=params.get("type");

let endpoint="/movie/popular";
let title="Movies";

if(type==="oscars"){
    window.location.href = "oscars.html";
    throw new Error("Redirecting to Oscars page");
}

if(type==="golden"){
endpoint="/trending/movie/week";
title="Golden Globe Style Movies";
}

if(type==="trending"){
endpoint="/trending/movie/day";
title="Trending Today";
}

if(type==="toprated"){
endpoint="/movie/top_rated";
title="Top Rated Movies";
}

if(type==="new"){
endpoint="/movie/now_playing";
title="New Releases";
}

if(type==="action"){
endpoint="/discover/movie?with_genres=28";
title="Action Movies";
}

document.getElementById("browseTitle").innerText=title;

async function load(){

const res=await fetch(`${BASE}${endpoint}?api_key=${API_KEY}`);

const data=await res.json();

const container=document.getElementById("browseMovies");

data.results.forEach(movie=>{

const poster=movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "";

const card=`
<div class="movie-card">

<img src="${poster}">

<p>${movie.title}</p>

</div>
`;

container.innerHTML+=card;

});

}

load();
