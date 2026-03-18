const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE_URL = "https://api.themoviedb.org/3";

/* LOAD MOVIES */
async function loadMovies(sort="popularity.desc"){

const list = document.getElementById("movieList");

list.innerHTML = "<p style='padding:20px;'>Loading...</p>";

try{

const res = await fetch(
`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sort}&vote_count.gte=200`
);

const data = await res.json();

list.innerHTML = "";

if(!data.results){
list.innerHTML = "No data found";
return;
}

data.results.slice(0,15).forEach((movie,index)=>{

const poster = movie.poster_path
? "https://image.tmdb.org/t/p/w500"+movie.poster_path
: "https://via.placeholder.com/500x750?text=No+Image";

const year = movie.release_date
? movie.release_date.split("-")[0]
: "NA";

const rating = movie.vote_average
? movie.vote_average.toFixed(1)
: "0";

let badge = "";
if(index < 3){
badge = '<span class="badge">🔥 Trending</span>';
}

const card = `
<div class="movie-card">

  <div class="poster">
    <img src="${poster}">
    <div class="watchlist">+</div>
  </div>

  <div class="details">

    <div class="title">
      ${index+1}. ${movie.title} ${badge}
    </div>

    <div class="meta">
      ${year} • ⭐ ${rating}
    </div>

    <div class="desc">
      ${movie.overview
        ? movie.overview.substring(0,90) + "..."
        : "No description available"}
    </div>

    <div class="buttons">
      <button class="btn watch-btn">▶ Watch Now</button>
      <button class="btn trailer-btn">Trailer</button>
    </div>

  </div>

</div>
`;

list.innerHTML += card;

});

}catch(error){
console.error("Error:", error);
list.innerHTML = "<p style='color:red;padding:20px;'>Failed to load</p>";
}

}

/* ============================= */
/* INIT AFTER LOAD */
/* ============================= */

document.addEventListener("DOMContentLoaded",()=>{

const sortSelect = document.getElementById("sortSelect");

if(sortSelect){
sortSelect.addEventListener("change",()=>{
loadMovies(sortSelect.value);
});
}

loadMovies();

});
