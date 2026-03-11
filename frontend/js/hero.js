const HERO_IMG = "https://image.tmdb.org/t/p/original";

let heroMovies = [];
let heroIndex = 0;

function renderHero(movie){

    const hero = document.getElementById("hero");

    const backdrop = movie.backdrop_path
        ? HERO_IMG + movie.backdrop_path
        : "";

    hero.innerHTML = `
        <div class="hero-banner" style="background-image:url('${backdrop}')">

            <div class="hero-content">

                <h1 class="hero-title">${movie.title}</h1>

                <div class="hero-rating">
                    ⭐ ${movie.vote_average.toFixed(1)}
                </div>

                <div class="hero-buttons">

                    <button class="hero-btn"
                        onclick="window.location.href='movie.html?id=${movie.id}'">
                        View Movie
                    </button>

                    <button class="hero-btn trailer"
                        onclick="window.location.href='trailer.html?id=${movie.id}'">
                        Watch Trailer
                    </button>

                </div>

            </div>

        </div>
    `;
}

function startHeroSlider(){

    setInterval(()=>{

        heroIndex++;

        if(heroIndex >= heroMovies.length){
            heroIndex = 0;
        }

        renderHero(heroMovies[heroIndex]);

    },10000);

}
