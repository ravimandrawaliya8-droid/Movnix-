const YT_THUMB = "https://img.youtube.com/vi/";

function createTrailerCard(video, movie){

    if(!video || !video.key) return null;

    const thumb = `${YT_THUMB}${video.key}/hqdefault.jpg`;

    const card = document.createElement("div");
    card.className = "trailer-card";

    card.innerHTML = `

        <div class="trailer-thumb">

            <img src="${thumb}" alt="${movie.title} trailer">

            <div class="play-sm">▶</div>

        </div>

        <p>${movie.title}</p>

    `;

    card.onclick = () => {
        window.location.href = `trailer.html?id=${movie.id}`;
    };

    return card;

}
