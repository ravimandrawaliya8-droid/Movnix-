/* ================= CONFIG ================= */

const API_KEY = "YOUR_TMDB_API_KEY_HERE"; // 🔥 यहाँ अपनी key डालो
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* ================= NAVIGATION ================= */

function goToYear(year){
    window.location.href = `oscars-${year}.html`;
}

/* ================= SCROLL ================= */

function scrollToYears(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

/* ================= TABS ================= */

document.querySelectorAll(".tabs span").forEach(tab=>{
    tab.addEventListener("click",()=>{
        document.querySelectorAll(".tabs span")
        .forEach(t=>t.classList.remove("active"));
        tab.classList.add("active");
    });
});

/* ================= RANDOM YEAR (NO REPEAT) ================= */

let lastYear = null;

function getRandomYear(){
    let year;
    do{
        year = Math.floor(Math.random() * (2026 - 2000 + 1)) + 2000;
    }while(year === lastYear);

    lastYear = year;
    return year;
}

/* ================= LOADER ================= */

function showLoader(){
    document.body.classList.add("loading");
}

function hideLoader(){
    document.body.classList.remove("loading");
}

/* ================= TMDB FETCH ================= */

async function fetchFromTMDB(name, type){

    try{

        let url = "";

        if(type === "movie"){
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;
        }else{
            url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if(data.results && data.results.length > 0){

            const item = data.results[0];

            return {
                image: (item.poster_path || item.profile_path)
                    ? IMG_URL + (item.poster_path || item.profile_path)
                    : "images/placeholder.jpg",

                rating: item.vote_average
                    ? item.vote_average.toFixed(1)
                    : "N/A"
            };
        }

    }catch(err){
        console.log("TMDB Error:", err);
    }

    return {
        image: "images/placeholder.jpg",
        rating: "N/A"
    };
}

/* ================= LOAD DATA ================= */

async function loadOscars(){

    showLoader();

    const year = getRandomYear();

    try{

        const res = await fetch(`oscars/${year}.json`);
        const data = await res.json();

        updateHero(year);
        updateFeatured(year);
        await renderWinners(data);
        attachCardClicks();

    }catch(err){
        console.error("Error loading Oscars:", err);

        const container = document.getElementById("winnersContainer");
        if(container){
            container.innerHTML = `<p style="color:#aaa;">⚠️ Failed to load data</p>`;
        }
    }

    hideLoader();
}

/* ================= HERO ================= */

function updateHero(year){

    const heroTitle = document.getElementById("heroTitle");
    const heroDesc = document.getElementById("heroDesc");

    if(heroTitle){
        heroTitle.innerText = "🏆 The Oscars Universe";
    }

    if(heroDesc){
        heroDesc.innerText = `Explore Oscars ${year} winners & iconic moments`;
    }

}

/* ================= FEATURED ================= */

function updateFeatured(year){

    const title = document.getElementById("featuredTitle");
    const desc = document.getElementById("featuredDesc");

    if(title){
        title.innerText = `🏆 The ${year} Oscars`;
    }

    if(desc){
        desc.innerText = `Explore ${year} Academy Awards winners & highlights`;
    }

}

/* ================= RENDER WINNERS ================= */

async function renderWinners(data){

    const container = document.getElementById("winnersContainer");
    if(!container) return;

    container.innerHTML = "";

    // 🔥 parallel fetch (fast loading)
    const results = await Promise.all(
        data.map(item => fetchFromTMDB(item.name, item.type))
    );

    data.forEach((item, index)=>{

        const tmdb = results[index];

        const card = document.createElement("div");
        card.className = "winner-card";

        card.innerHTML = `
            <img src="${tmdb.image}" onerror="this.src='images/placeholder.jpg'">

            <div class="card-info">
                <h3>🏆 ${item.category}</h3>
                <p>${item.name}</p>
                <small>${item.type === "movie" ? "Movie" : "Artist"}</small>

                <div class="ratings">
                    ⭐ ${tmdb.rating}
                </div>
            </div>
        `;

        setTimeout(()=>{
            container.appendChild(card);
            observer.observe(card);
        }, index * 100);

    });

}

/* ================= CARD CLICK ================= */

function attachCardClicks(){

    document.querySelectorAll(".winner-card, .trend-card")
    .forEach(card=>{
        card.addEventListener("click",()=>{
            card.classList.add("active");
            setTimeout(()=>card.classList.remove("active"), 200);

            console.log("Open details page soon");
        });
    });

}

/* ================= ANIMATION ================= */

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", loadOscars);
