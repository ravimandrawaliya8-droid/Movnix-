/* ================= CONFIG ================= */

const API_KEY = "YOUR_TMDB_API_KEY"; // 🔥 यहाँ अपनी key डालो
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* ================= NAVIGATION ================= */

function goToYear(year){
    window.location.href = `oscars-${year}.html`;
}

/* ================= SCROLL ================= */

function scrollToYears(){
    document.querySelector(".iconic")?.scrollIntoView({
        behavior: "smooth"
    });
}

/* ================= RANDOM YEAR ================= */

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

/* ================= YEAR SELECTOR ================= */

function initYearSelector(){

    const select = document.getElementById("yearSelect");
    if(!select) return;

    for(let y = 2026; y >= 2000; y--){
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        select.appendChild(option);
    }

    select.addEventListener("change", ()=>{
        loadOscarsByYear(select.value);
    });

}

/* ================= TMDB FETCH ================= */

async function fetchFromTMDB(name, type){

    try{

        let url = type === "movie"
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
        : `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;

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

/* ================= LOAD OSCARS ================= */

async function loadOscars(){
    loadOscarsByYear(getRandomYear());
}

async function loadOscarsByYear(year){

    showLoader();

    try{

        const res = await fetch(`oscars/${year}.json`);
        const data = await res.json();

        updateHero(year);
        updateFeatured(year);
        await renderWinners(data);

    }catch(err){
        console.error("Error:", err);

        document.getElementById("winnersContainer").innerHTML =
        `<p style="color:#aaa;">Failed to load data</p>`;
    }

    hideLoader();
}

/* ================= HERO ================= */

function updateHero(year){
    const title = document.getElementById("heroTitle");
    const desc = document.getElementById("heroDesc");

    if(title) title.innerText = "The Oscars Universe";
    if(desc) desc.innerText = `Explore Oscars ${year} winners & iconic moments`;
}

/* ================= FEATURED ================= */

function updateFeatured(year){
    const title = document.getElementById("featuredTitle");
    const desc = document.getElementById("featuredDesc");

    if(title) title.innerText = `The ${year} Oscars`;
    if(desc) desc.innerText = `Explore ${year} Academy Awards winners & highlights`;
}

/* ================= RENDER WINNERS ================= */

async function renderWinners(data){

    const container = document.getElementById("winnersContainer");
    if(!container) return;

    container.innerHTML = "";

    const results = await Promise.all(
        data.map(item => fetchFromTMDB(item.name, item.type))
    );

    data.forEach((item, index)=>{

        const tmdb = results[index];

        const card = document.createElement("div");
        card.className = "winner-card";

        card.innerHTML = `
            <img src="${tmdb.image}">
            <div class="card-info">
                <h3>${item.category}</h3>
                <p>${item.name}</p>
                <small>${item.type}</small>
                <div class="ratings">${tmdb.rating}</div>
            </div>
        `;

        card.addEventListener("click", ()=>{
            openPopup(item.name, tmdb.image, tmdb.rating);
        });

        setTimeout(()=>{
            container.appendChild(card);
            observer.observe(card);
        }, index * 80);

    });

}

/* ================= TRENDING ================= */

async function loadTrending(){

    const container = document.getElementById("trendingContainer");
    if(!container) return;

    container.innerHTML = "";

    try{

        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=5000`
        );

        const data = await res.json();

        data.results.slice(0,10).forEach(movie=>{

            const card = document.createElement("div");
            card.className = "trend-card";

            card.innerHTML = `
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'images/placeholder.jpg'}">
                <p>${movie.title}</p>
            `;

            container.appendChild(card);
            observer.observe(card);

        });

    }catch(err){
        console.log("Trending Error:", err);
    }
}

/* ================= POPUP ================= */

function openPopup(title, img, rating){

    let popup = document.getElementById("popup");

    if(!popup){
        popup = document.createElement("div");
        popup.id = "popup";
        document.body.appendChild(popup);
    }

    popup.innerHTML = `
        <div class="popup-box">
            <img src="${img}">
            <h2>${title}</h2>
            <p>Rating: ${rating}</p>
            <button onclick="closePopup()">Close</button>
        </div>
    `;

    popup.style.display = "flex";
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
}

/* ================= TABS ================= */

document.querySelectorAll(".tabs span").forEach(tab=>{

    tab.addEventListener("click",()=>{

        document.querySelectorAll(".tabs span")
        .forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

        const text = tab.innerText.toLowerCase();

        if(text.includes("winners")){
            loadOscars();
        }

        if(text.includes("trending")){
            loadTrending();
        }

    });

});

/* ================= AUTO SCROLL ================= */

setInterval(()=>{
    document.querySelectorAll(".card-row").forEach(row=>{
        row.scrollBy({ left: 200, behavior: "smooth" });
    });
}, 4000);

/* ================= ANIMATION ================= */

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", ()=>{
    initYearSelector();   // 🔥 year dropdown
    loadOscars();         // winners
    loadTrending();       // trending
});
