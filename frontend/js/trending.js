const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

/* COMMON FETCH */
async function getMovies(endpoint){

    const url = endpoint.includes("?")
    ? `${BASE}${endpoint}&api_key=${API_KEY}`
    : `${BASE}${endpoint}?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results || [];
}

/* LOAD TRENDING */
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

            /* TREND SCORE */
            let trend = Math.round((movie.popularity / 10) + (movie.vote_average * 5));
            if(trend > 100) trend = 100;

            const card = `
            <div class="trend-card">

                <div class="rank">#${index+1}</div>

                <div class="trend-poster">
                    <img src="${poster}" alt="${movie.title}">
                    <div class="watch-icon">+</div>
                </div>

                <div class="trend-info">

                    <h3>${movie.title}</h3>

                    <div class="meta">
                        ${year} • ⭐ ${rating}
                    </div>

                    <div class="trend-score">
                        🔥 ${trend}% Trending
                    </div>

                    <div class="trend-actions">

                        <a href="trailer.html?id=${movie.id}" class="btn">
                            ▶ Trailer
                        </a>

                        <a href="movie.html?id=${movie.id}" class="btn">
                            ℹ Details
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
