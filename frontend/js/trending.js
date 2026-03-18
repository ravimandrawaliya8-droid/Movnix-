const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

let currentSort = "popularity.desc";

/* ================= FILTER STATE ================= */
let filters = {
    country: "IN",
    rating: null,
    year: null
};


/* ================= FETCH ================= */
async function getMovies(endpoint){

    const url = endpoint.includes("?")
    ? `${BASE}${endpoint}&api_key=${API_KEY}`
    : `${BASE}${endpoint}?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results || [];
}


/* ================= OPEN MOVIE ================= */
function openMovie(id){
    window.location.href = `movie.html?id=${id}`;
}


/* ================= LOAD MOVIES (PREMIUM UI) ================= */
async function loadMovies(sort="popularity.desc"){

    currentSort = sort;

    const list = document.getElementById("movieList");

    list.innerHTML = "<p style='padding:20px;'>Loading...</p>";

    try{

        let url = `/discover/movie?sort_by=${sort}&vote_count.gte=200`;

        if(filters.country){
            url += `&with_origin_country=${filters.country}`;
        }

        if(filters.rating){
            url += `&vote_average.gte=${filters.rating}`;
        }

        if(filters.year){
            url += `&primary_release_year=${filters.year}`;
        }

        const movies = await getMovies(url);

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
            ? movie.overview.slice(0,100) + "..."
            : "No description available.";

            /* 🎨 DYNAMIC ACCENT COLOR (TOP RANK GOLD) */
            let accentColor = index === 0 
                ? "linear-gradient(#ffd700,#ffae00)" 
                : index === 1 
                ? "linear-gradient(#c0c0c0,#999)" 
                : "linear-gradient(#ff4d4d,#ff0000)";

            const card = `
            <div class="movie-card" onclick="openMovie(${movie.id})">

                <!-- LEFT ACCENT -->
                <div class="accent" style="background:${accentColor}"></div>

                <!-- POSTER -->
                <div class="poster">
                    <img src="${poster}">

                    <!--  SAVE ICON -->
                    <div class="save-btn" onclick="event.stopPropagation()">🔖</div>
                </div>

                <!-- DETAILS -->
                <div class="details">

                    <div class="title">
                        ${index+1}. ${movie.title}
                    </div>

                    <div class="meta">
                        ${year} • Movie
                    </div>

                    <!-- ⭐ RATING BADGE -->
                    <div class="rating-badge">
                        ⭐ ${rating}
                    </div>

                    <div class="desc">
                        ${overview}
                    </div>

                    <!-- 🎭 GENRES (STATIC FOR NOW) -->
                    <div class="genres">
                        <span>Drama</span>
                        <span>Romance</span>
                    </div>

                    <!-- ACTIONS -->
                    <div class="actions">

                        <button class="watchlist-btn" onclick="event.stopPropagation()">
                            + Watchlist
                        </button>

                        <button class="details-btn" 
                            onclick="event.stopPropagation();window.location.href='movie.html?id=${movie.id}'">
                            ℹ Details
                        </button>

                    </div>

                    <!-- 📊 PROGRESS BAR -->
                    <div class="progress">
                        <div style="width:${rating*10}%"></div>
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


/* ================= YEAR DROPDOWN ================= */

function toggleYearDropdown(){
    const list = document.getElementById("yearList");
    list.style.display = list.style.display === "block" ? "none" : "block";
}

function generateYears(){

    const list = document.getElementById("yearList");

    const currentYear = new Date().getFullYear();

    let yearsHTML = "";

    for(let y = currentYear + 2; y >= 2010; y--){
        yearsHTML += `<div onclick="selectYear(${y})">${y}</div>`;
    }

    list.innerHTML = yearsHTML;
}

function selectYear(year){

    filters.year = year;

    document.querySelector(".year-btn").innerText = year + " ▼";

    document.getElementById("yearList").style.display = "none";

    loadMovies(currentSort);
}


/* ================= SORT TOGGLE ================= */
function toggleSort(){

    const btn = document.querySelector(".sort-toggle");

    if(currentSort.includes(".desc")){
        currentSort = currentSort.replace(".desc",".asc");
        btn.innerText = "⬆ Asc";
    }else{
        currentSort = currentSort.replace(".asc",".desc");
        btn.innerText = "⬇ Desc";
    }

    loadMovies(currentSort);
}

/* ================= USER RATING SYSTEM ================= */

function getUserRating(id){
    return localStorage.getItem("rating_"+id);
}

function rateMovie(id, el){

    let rating = prompt("Rate this movie (1 to 10):");

    if(!rating) return;

    rating = parseFloat(rating);

    if(rating < 1 || rating > 10){
        alert("Enter rating between 1 - 10");
        return;
    }

    localStorage.setItem("rating_"+id, rating.toFixed(1));

    // update UI instantly
    el.querySelector("span").innerText = rating.toFixed(1);
}

/* ================= INIT (SAFE ZONE) ================= */
document.addEventListener("DOMContentLoaded",()=>{

    const sortSelect = document.getElementById("sortSelect");

    if(sortSelect){
        sortSelect.innerHTML = `
            <option value="popularity.desc"> Popularity</option>
            <option value="vote_average.desc"> Rating</option>
            <option value="release_date.desc"> Latest</option>
            <option value="release_date.asc"> Oldest</option>
        `;

        sortSelect.addEventListener("change",()=>{
            loadMovies(sortSelect.value);
        });
    }

    /* ✅ CHIP CLICK LOGIC */
    document.querySelectorAll(".chip").forEach(chip=>{

        chip.addEventListener("click",()=>{

            chip.classList.toggle("active");

            if(chip.dataset.country){
                filters.country = chip.classList.contains("active") 
                ? chip.dataset.country 
                : null;
            }

            if(chip.dataset.rating){
                filters.rating = chip.classList.contains("active") 
                ? chip.dataset.rating 
                : null;
            }

            loadMovies(currentSort);

        });

    });

    /* ✅ DEFAULT ACTIVE INDIA */
    const indiaChip = document.querySelector('[data-country="IN"]');
    if(indiaChip){
        indiaChip.classList.add("active");
    }

    /* ✅ SEARCH FEATURE */
    const searchInput = document.getElementById("searchInput");

    if(searchInput){
        searchInput.addEventListener("input",()=>{

            const value = searchInput.value.toLowerCase();

            document.querySelectorAll(".movie-card").forEach(card=>{

                const title = card.querySelector(".title").innerText.toLowerCase();

                card.style.display = title.includes(value) ? "flex" : "none";

            });

        });
    }

    generateYears();
    loadMovies();

});
