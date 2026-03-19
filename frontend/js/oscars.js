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

/* ================= LOAD DATA ================= */

async function loadOscars(){

    showLoader();

    const year = getRandomYear();

    try{

        const res = await fetch(`oscars/${year}.json`);
        const data = await res.json();

        updateHero(year, data);
        updateFeatured(year);
        renderWinners(data);
        attachCardClicks();

    }catch(err){
        console.error("Error loading Oscars:", err);

        document.querySelector(".iconic .card-row").innerHTML =
        `<p style="color:#aaa;">⚠️ Failed to load data</p>`;
    }

    hideLoader();
}

/* ================= HERO UPDATE ================= */

function updateHero(year, data){

    const heroTitle = document.querySelector(".hero h1");
    const heroDesc = document.querySelector(".hero p");
    const hero = document.querySelector(".hero");

    if(heroTitle){
        heroTitle.innerText = `🏆 The Oscars Universe`;
    }

    if(heroDesc){
        heroDesc.innerText =
        `Explore Oscars ${year} winners & iconic moments`;
    }

    // premium gradient glow
    if(hero){
        hero.style.background = `
        radial-gradient(circle at top, rgba(255,215,0,0.25), transparent),
        linear-gradient(to bottom, rgba(0,0,0,0.7), #0b0b0f),
        url(images/hero.jpg) center/cover`;
    }

}

/* ================= FEATURED ================= */

function updateFeatured(year){

    const title = document.querySelector(".featured-text h2");
    const desc = document.querySelector(".featured-text p");

    if(title){
        title.innerText = `🏆 The ${year} Oscars`;
    }

    if(desc){
        desc.innerText =
        `Explore ${year} Academy Awards winners & highlights`;
    }

}

/* ================= WINNERS ================= */

function renderWinners(data){

    const container = document.querySelector(".iconic .card-row");
    if(!container) return;

    container.innerHTML = "";

    data.forEach((item, index)=>{

        const card = document.createElement("div");
        card.className = "winner-card";

        const imdb = (Math.random()*3 + 7).toFixed(1);
        const user = (Math.random()*5 + 5).toFixed(1);

        card.innerHTML = `
            <img src="images/placeholder.jpg"
                 onerror="this.src='images/placeholder.jpg'">

            <div class="card-info">
                <h3>🏆 ${item.category}</h3>
                <p>${item.name}</p>
                <small>${item.type === "movie" ? "Movie" : "Artist"}</small>

                <div class="ratings">
                    ⭐ ${imdb}
                    🔵 ${user}
                </div>
            </div>
        `;

        // smooth stagger animation
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

/* ================= AUTO REFRESH (OPTIONAL PREMIUM) ================= */

// हर 20 sec में नया data (optional feel)
// setInterval(loadOscars, 20000);

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", loadOscars);
