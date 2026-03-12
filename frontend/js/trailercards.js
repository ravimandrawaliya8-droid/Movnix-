const YT_THUMB = "https://img.youtube.com/vi/";

function createTrailerCard(video, movie){

    if(!video || !video.key) return null;

    const thumb = `${YT_THUMB}${video.key}/hqdefault.jpg`;

    const card = document.createElement("div");
    card.className = "trailer-card";

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "7.5";
    const likes = movie.vote_count ? Math.floor(movie.vote_count/10) : "120";

    card.innerHTML = `

        <div class="trailer-thumb">

            <img src="${thumb}" alt="${movie.title} trailer">

            <div class="watch-time">2:15</div>

            <div class="play-sm">▶</div>

        </div>

        <p>${movie.title}</p>

        <div class="trailer-meta">
            <span>⭐ ${rating}</span>
            <span>❤️ ${likes}</span>
        </div>

    `;

    card.onclick = () => {
        window.location.href = `trailer.html?id=${movie.id}`;
    };

    return card;

}
