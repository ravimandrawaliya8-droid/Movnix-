/* ================= NAVIGATION ================= */

function goToYear(year){
    window.location.href = `oscars-${year}.html`;
}

/* ================= SCROLL ================= */

function scrollToYears(){
    const section = document.getElementById("yearsSection");
    if(section){
        section.scrollIntoView({ behavior: "smooth" });
    }
}

/* ================= TABS ================= */

document.querySelectorAll(".tabs span").forEach(tab=>{

    tab.addEventListener("click",()=>{

        document.querySelectorAll(".tabs span")
        .forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

    });

});

/* ================= CARD CLICK ================= */

document.querySelectorAll(".winner-card, .trend-card").forEach(card=>{

    card.addEventListener("click",()=>{

        // future: open movie page
        console.log("Card clicked");

    });

});

/* ================= ANIMATION (ENTRY) ================= */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll(".winner-card, .trend-card")
.forEach(el=>observer.observe(el));
