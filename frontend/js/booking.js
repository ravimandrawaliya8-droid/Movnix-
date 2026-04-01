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

// ==============================
// CONFIG
// ==============================
const GOOGLE_API = "YOUR_GOOGLE_API_KEY";
const THEATRE_LIMIT = 10;
const container = document.getElementById("theatreContainer");

// ==============================
// LOAD GOOGLE SCRIPT
// ==============================
function loadGoogleScript() {
  return new Promise((resolve) => {
    if (window.google) return resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&libraries=places`;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

// ==============================
// GET USER LOCATION
// ==============================
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      reject
    );
  });
}

// ==============================
// GET NEARBY THEATRES (REAL WORKING)
// ==============================
function getNearbyTheatres(lat, lng) {
  return new Promise((resolve, reject) => {
    const location = new google.maps.LatLng(lat, lng);

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(
      {
        location: location,
        radius: 5000,
        type: ["movie_theater"],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results.slice(0, THEATRE_LIMIT));
        } else {
          reject(status);
        }
      }
    );
  });
}

// ==============================
// GENERATE SHOWTIMES
// ==============================
function generateShowtimes() {
  const baseTimes = [10, 13, 16, 19, 22];
  return baseTimes.map((h) => {
    const date = new Date();
    date.setHours(h, Math.random() > 0.5 ? 30 : 0);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
}

// ==============================
// DISTANCE CALCULATOR
// ==============================
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

// ==============================
// CREATE THEATRE CARD (UPGRADED)
// ==============================
function createTheatreCard(theatre, userLoc) {
  const showtimes = generateShowtimes();

  const distance = getDistance(
    userLoc.lat,
    userLoc.lng,
    theatre.geometry.location.lat(),
    theatre.geometry.location.lng()
  );

  const formats = ["IMAX", "2D", "3D"];
  const format = formats[Math.floor(Math.random() * formats.length)];

  const timesHTML = showtimes
    .map(
      (t, i) => `
      <button class="time-btn ${i === 2 ? "active" : ""}">
        ${t}
      </button>
    `
    )
    .join("");

  return `
    <div class="theatre-card">
      
      <div class="theatre-header">
        <div class="logo">🎬</div>
        <div>
          <h3>${theatre.name}</h3>
          <p>${distance} km away • ${format}</p>
        </div>
      </div>

      <div class="showtimes">
        ${timesHTML}
      </div>

    </div>
  `;
}

// ==============================
// RENDER
// ==============================
function renderTheatres(theatres, userLoc) {
  container.innerHTML = "";

  theatres.forEach((t, i) => {
    container.innerHTML += createTheatreCard(t, userLoc);
  });

  addInteractions();
}

// ==============================
// INTERACTIONS (UPGRADED)
// ==============================
function addInteractions() {
  document.querySelectorAll(".time-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".time-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
    });
  });
}

// ==============================
// INIT
// ==============================
async function initBooking() {
  try {
    await loadGoogleScript();

    const userLoc = await getUserLocation();
    const theatres = await getNearbyTheatres(
      userLoc.lat,
      userLoc.lng
    );

    renderTheatres(theatres, userLoc);
  } catch (err) {
    console.error("Error:", err);
  }
}

initBooking();

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
