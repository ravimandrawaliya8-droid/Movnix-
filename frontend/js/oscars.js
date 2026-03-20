/* ================= CONFIG ================= */

const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/w780";

/* ================= GLOBAL ================= */

let allOscarsData = [];
let isLoaded = false;

/* ================= NAVIGATION ================= */

function goToYear(year){
    window.location.href = `oscars-${year}.html`;
}

function scrollToYears(){
    document.querySelector(".iconic")?.scrollIntoView({
        behavior: "smooth"
    });
}

/* ================= LOADER ================= */

function showLoader(){
    document.getElementById("loader").style.display = "block";
}

function hideLoader(){
    document.getElementById("loader").style.display = "none";
}

/* ================= YEAR SELECT ================= */

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
        goToYear(select.value);
    });
}

/* ================= TMDB ================= */

async function fetchFromTMDB(name, type){
    try{
        let url = type === "movie"
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
        : `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;

        const res = await fetch(url);
        const data = await res.json();

        if(data.results?.length > 0){
            const item = data.results[0];

            return {
                // 🔥 BACKDROP PRIORITY (better look)
                image: item.backdrop_path
                    ? BACKDROP_URL + item.backdrop_path
                    : item.poster_path || item.profile_path
                    ? IMG_URL + (item.poster_path || item.profile_path)
                    : "images/placeholder.jpg",

                rating: item.vote_average || "N/A"
            };
        }

    }catch(e){}

    return { image: "images/placeholder.jpg", rating: "N/A" };
}

/* ================= LOAD ALL OSCARS ================= */

async function loadAllOscars(){

    if(isLoaded) return;

    showLoader();

    const container = document.getElementById("winnersContainer");
    container.innerHTML = "";

    const years = [];
    for(let y = 2026; y >= 2000; y--) years.push(y);

    const results = await Promise.all(
        years.map(async year=>{
            try{
                const res = await fetch(`oscars/${year}.json`);
                const data = await res.json();
                return { year, data };
            }catch{
                return null;
            }
        })
    );

    for(let item of results){

        if(!item) continue;

        const {year, data} = item;

        allOscarsData.push({year, data});

        const image = await getYearImage(data, year);

        // ✅ ONLY ONE CARD PER YEAR
        createCard({
            year,
            type: "Winners",
            title: `${year} Academy Award Winners`,
            desc: `Explore full winners & highlights from ${year}`,
            image
        });
    }

    isLoaded = true;
    hideLoader();
}

/* ================= SMART IMAGE ================= */

async function getYearImage(data, year){

    if(!data?.length) return "images/placeholder.jpg";

    // 🎯 Priority categories
    const priority = ["Best Picture", "Best Actor", "Best Actress"];

    let item = data.find(d => priority.includes(d.category));

    if(!item){
        item = data[Math.floor(Math.random()*data.length)];
    }

    const tmdb = await fetchFromTMDB(item.name, item.type);

    return tmdb.image;
}

/* ================= CARD ================= */

function createCard({year, type, title, desc, image}){

    const container = document.getElementById("winnersContainer");

    const card = document.createElement("div");
    card.className = "imdb-card";

    card.innerHTML = `
        <div class="imdb-img-wrap">
            <span class="year-badge">${year}</span>
            <img src="${image}" loading="lazy">
        </div>

        <div class="imdb-content">
            <div class="imdb-label">${type}</div>
            <div class="imdb-title">${title}</div>
            <div class="imdb-desc">${desc}</div>
            <a class="imdb-link">Explore →</a>
        </div>
    `;

    card.onclick = ()=> goToYear(year);

    container.appendChild(card);
}

/* ================= SEARCH ================= */

function initSearch(){

    const input = document.getElementById("searchInput");
    const resultBox = document.getElementById("searchResults");
    const container = document.getElementById("searchContainer");

    input.addEventListener("input", ()=>{

        const query = input.value.toLowerCase().trim();

        if(!query){
            resultBox.style.display = "none";
            return;
        }

        container.innerHTML = "";
        resultBox.style.display = "block";

        allOscarsData.forEach(item=>{

            if(item.year.toString().includes(query)){
                createSearchCard(item.year);
            }

            item.data.forEach(d=>{

                if(d.name.toLowerCase().includes(query)){
                    createSearchCard(item.year, d.name);
                }
            });

        });

    });
}

/* ================= SEARCH CARD ================= */

function createSearchCard(year, name="Oscars"){

    const container = document.getElementById("searchContainer");

    const div = document.createElement("div");
    div.className = "winner-card";

    div.innerHTML = `
        <div class="card-info">
            <h3>${year}</h3>
            <p>${name}</p>
        </div>
    `;

    div.onclick = ()=> goToYear(year);

    container.appendChild(div);
}

/* ================= TABS ================= */

function initTabs(){

    document.querySelectorAll(".tabs span").forEach(tab=>{

        tab.addEventListener("click",()=>{

            document.querySelectorAll(".tabs span")
            .forEach(t=>t.classList.remove("active"));

            tab.classList.add("active");

            const text = tab.innerText.toLowerCase();

            if(text.includes("winners")) loadAllOscars();
            if(text.includes("trending")) loadTrending();
        });
    });
}

/* ================= TRENDING ================= */

async function loadTrending(){

    const container = document.getElementById("trendingContainer");
    container.innerHTML = "";

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const data = await res.json();

    data.results.slice(0,10).forEach(movie=>{
        const card = document.createElement("div");
        card.className = "trend-card";

        card.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}">
            <p>${movie.title}</p>
        `;

        container.appendChild(card);
    });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", ()=>{

    initYearSelector();
    initTabs();
    initSearch();

    loadAllOscars();

});
