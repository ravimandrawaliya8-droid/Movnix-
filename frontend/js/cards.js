const IMG_URL = "https://image.tmdb.org/t/p/w342";

function createMovieCard(movie){

    const poster = movie.poster_path 
        ? IMG_URL + movie.poster_path
        : "https://via.placeholder.com/342x513?text=No+Image";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
        <div class="poster-wrap">
            <img src="${poster}" alt="${movie.title}">
        </div>

        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</div>
        </div>
    `;

    card.onclick = () => {
        window.location.href = "movie.html?id=" + movie.id;
    };

    return card;
}
