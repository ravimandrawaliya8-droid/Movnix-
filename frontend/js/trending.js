const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

/* FETCH */
async function getMovies(endpoint){

    const url = endpoint.includes("?")
    ? `${BASE}${endpoint}&api_key=${API_KEY}`
    : `${BASE}${endpoint}?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results || [];
}

/* LOAD */
async function loadMovies(sort="popularity.desc"){

    const list = document.getElementById("movieList");

    list.innerHTML = "<p style='padding:20px;'>Loading...</p>";

    try{

        const movies = await getMovies(
            `/discover/movie?with_origin_country=IN&sort_by=${sort}&vote_count.gte=200`
        );

        list.innerHTML = "";

        movies.slice(0,15).forEach((movie,index)=>{

            const poster = movie.poster_path
            ? "https://image.tmdb.org/t/p/w500"+movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image";

            const rating = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "0";

            const year = movie.release_date
            ? movie.release_date.split("-")[0]
            : "NA";

            const overview = movie.overview
            ? movie.overview.slice(0,120) + "..."
            : "No description available.";

            const card = `
            <div class="movie-card">

                <div class="poster">
                    <img src="${poster}">
                    <div class="watchlist">+</div>
                </div>

                <div class="details">

                    <div class="title">
                        ${index+1}. ${movie.title}
                    </div>

                    <div class="meta">
                        ${year} • Movie
                    </div>

                    <div class="rating">
                        ⭐ <span>${rating}</span>
                    </div>

                    <div class="desc">
                        ${overview}
                    </div>

                    <div class="actions">

                        <a href="#" class="watched">
                            👁 Mark as watched
                        </a>

                        <a href="movie.html?id=${movie.id}" class="info-btn">
                            ℹ️
                        </a>

                    </div>

                </div>

            </div>
            `;

            list.innerHTML += card;

        });

    }catch(err){
        console.error(err);
        list.innerHTML = "<p style='color:red;padding:20px;'>Failed to load</p>";
    }

}

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{

    const sortSelect = document.getElementById("sortSelect");

    if(sortSelect){
        sortSelect.addEventListener("change",()=>{
            loadMovies(sortSelect.value);
        });
    }

    loadMovies();

});
