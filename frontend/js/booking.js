const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";

/* ---------------- GET MOVIE DETAILS ---------------- */

async function getMovieDetails(id){

    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();

    return data;

}

/* ---------------- LOAD MOVIE ---------------- */

async function loadMovie(){

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(!id) return;

    const movie = await getMovieDetails(id);

    const poster = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Poster";

    document.getElementById("movieBox").innerHTML = `
    
        <img src="${poster}">
        <h2>${movie.title}</h2>
        <p>${movie.overview || "No description available"}</p>
    
    `;

}

/* ---------------- SEAT SYSTEM ---------------- */

let selectedSeats = [];

function generateSeats(){

    const container = document.getElementById("seatContainer");
    if(!container) return;

    container.innerHTML = "";

    for(let i=1;i<=40;i++){

        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = i;

        seat.addEventListener("click", ()=>{

            if(seat.classList.contains("booked")) return;

            seat.classList.toggle("selected");

            if(selectedSeats.includes(i)){
                selectedSeats = selectedSeats.filter(s => s !== i);
            }else{
                selectedSeats.push(i);
            }

            updateTotal();

        });

        container.appendChild(seat);

    }

}

/* ---------------- TOTAL PRICE ---------------- */

function updateTotal(){

    const pricePerSeat = 150;

    const total = selectedSeats.length * pricePerSeat;

    document.getElementById("total").innerText = `₹ ${total}`;

}

/* ---------------- BOOK NOW ---------------- */

function bookNow(){

    if(selectedSeats.length === 0){
        alert("Select at least 1 seat");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    const bookingData = {
        movieId,
        seats: selectedSeats,
        total: selectedSeats.length * 150,
        time: new Date().toLocaleString()
    };

    /* SAVE */

    const old = JSON.parse(localStorage.getItem("bookings")) || [];
    old.push(bookingData);

    localStorage.setItem("bookings", JSON.stringify(old));

    alert("Booking Confirmed 🎉");

    window.location.href = "mybookings.html";

}

/* ---------------- INIT ---------------- */

function init(){

    loadMovie();
    generateSeats();

    const btn = document.getElementById("bookBtn");

    if(btn){
        btn.addEventListener("click", bookNow);
    }

}

init();
