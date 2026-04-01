const API_KEY = "45fe7a9c4583e4374d3981bb55c39222";
const BASE = "https://api.themoviedb.org/3";
const GOOGLE_API = "YOUR_GOOGLE_API_KEY";
const THEATRE_LIMIT = 10;

/* ---------------- MOVIE DETAILS ---------------- */

async function getMovieDetails(id){
    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
    return await res.json();
}

async function loadMovie(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if(!id) return;

    const movie = await getMovieDetails(id);

    const poster = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Poster";

    document.getElementById("movieBox").innerHTML = `
        <div class="movie-hero">
            <img class="movie-poster" src="${poster}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p class="movie-meta">${movie.release_date || ""}</p>
                <p>${movie.overview || "No description available"}</p>
            </div>
        </div>
    `;
}

/* ---------------- GOOGLE LOAD (FIXED) ---------------- */

function loadGoogleScript() {
  return new Promise((resolve) => {

    if (window.google && window.google.maps) return resolve();

    const existing = document.querySelector("script[data-google]");
    if(existing) return resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&libraries=places`;
    script.setAttribute("data-google","true");

    script.onload = resolve;
    document.head.appendChild(script);
  });
}

/* ---------------- LOCATION ---------------- */

function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      reject
    );
  });
}

/* ---------------- THEATRES ---------------- */

function getNearbyTheatres(lat, lng) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch({
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,
      type: ["movie_theater"]
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.slice(0, THEATRE_LIMIT));
      } else reject(status);
    });
  });
}

/* ---------------- UI HELPERS ---------------- */

function generateShowtimes() {
  const baseTimes = [10, 13, 16, 19, 22];
  return baseTimes.map(h => {
    const d = new Date();
    d.setHours(h, Math.random() > 0.5 ? 30 : 0);
    return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  });
}

/* ---------------- FIXED DISTANCE ---------------- */

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2)**2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
}

/* ---------------- THEATRE CARD (FIXED UI) ---------------- */

function createTheatreCard(theatre, userLoc, index){
  const times = generateShowtimes();

  const distance = getDistance(
    userLoc.lat,
    userLoc.lng,
    theatre.geometry.location.lat(),
    theatre.geometry.location.lng()
  );

  const timesHTML = times.map((t,i)=>`
    <button class="time-btn ${i===2?'active':''}">${t}</button>
  `).join("");

  return `
  <div class="theatre-card ${index === 0 ? "active" : ""}">
    
    <div class="theatre-header">
      <div class="logo">🎬</div>
      <div>
        <h3>${theatre.name}</h3>
        <p>${distance} km away</p>
      </div>
    </div>

    <div class="showtimes">${timesHTML}</div>

  </div>`;
}

/* ---------------- RENDER ---------------- */

function renderTheatres(theatres, userLoc){
  const container = document.getElementById("theatreContainer");

  container.innerHTML = theatres
    .map((t,i)=>createTheatreCard(t,userLoc,i))
    .join("");

  document.querySelectorAll(".time-btn").forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll(".time-btn")
        .forEach(b=>b.classList.remove("active"));

      btn.classList.add("active");
    };
  });
}

/* ---------------- LOAD THEATRE (SAFE) ---------------- */

async function loadTheatreSection(){
  try{
    await loadGoogleScript();

    const userLoc = await getUserLocation();
    const theatres = await getNearbyTheatres(userLoc.lat, userLoc.lng);

    renderTheatres(theatres, userLoc);

  } catch(err){
    document.getElementById("theatreContainer").innerHTML =
      "<p style='color:red'>Unable to load theatres 😢</p>";

    console.error("THEATRE ERROR:", err);
  }
}

/* ---------------- SEATS ---------------- */

let selectedSeats = [];

function generateSeats(){
  const container = document.getElementById("seatContainer");
  if(!container) return;

  container.innerHTML = "";

  for(let i=1;i<=40;i++){
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.innerText = i;

    seat.onclick = ()=>{
      if(seat.classList.contains("booked")) return;

      seat.classList.toggle("selected");

      if(selectedSeats.includes(i)){
        selectedSeats = selectedSeats.filter(s=>s!==i);
      } else selectedSeats.push(i);

      updateTotal();
    };

    container.appendChild(seat);
  }
}

function updateTotal(){
  document.getElementById("total").innerText =
    `₹ ${selectedSeats.length * 150}`;
}

function bookNow(){
  if(selectedSeats.length === 0){
    alert("Select at least 1 seat");
    return;
  }

  const movieId = new URLSearchParams(window.location.search).get("id");

  const data = {
    movieId,
    seats: selectedSeats,
    total: selectedSeats.length * 150,
    time: new Date().toLocaleString()
  };

  const old = JSON.parse(localStorage.getItem("bookings")) || [];
  old.push(data);
  localStorage.setItem("bookings", JSON.stringify(old));

  alert("Booking Confirmed 🎉");
  window.location.href = "mybookings.html";
}

/* =====================================================
   🚀 LAZY LOAD SYSTEM (UNCHANGED)
===================================================== */

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      const id = entry.target.id;

      if(id === "movieSection") loadMovie();
      if(id === "theatreSection") loadTheatreSection();
      if(id === "seatSection") generateSeats();

      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.3 });

/* ---------------- INIT ---------------- */

window.addEventListener("DOMContentLoaded", ()=>{

  const sections = [
    "movieSection",
    "theatreSection",
    "seatSection"
  ];

  sections.forEach(id=>{
    const el = document.getElementById(id);
    if(el) observer.observe(el);
  });

  const btn = document.getElementById("bookBtn");
  if(btn) btn.onclick = bookNow;

});
