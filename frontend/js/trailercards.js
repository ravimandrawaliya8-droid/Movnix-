const YT_THUMB = "https://img.youtube.com/vi/";

function createTrailerCard(video, movie){

    const thumb = `${YT_THUMB}${video.key}/hqdefault.jpg`;

    const card = document.createElement("div");
    card.className = "trailer-card";

    card.innerHTML = `
        <div class="trailer-thumb">
            <img src="${thumb}">
            <div class="play-btn">▶</div>
        </div>

        <div class="trailer-title">
            ${movie.title}
        </div>
    `;

    card.onclick = () => {
        window.location.href = `trailer.html?id=${movie.id}`;
    };

    return card;

}
