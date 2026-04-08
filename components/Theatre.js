"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";

export default function Theatre() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("trending");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState({});

  const theatres = [
    "PVR Cinemas",
    "INOX",
    "Cinépolis",
    "Miraj Cinemas",
    "Moviemax",
  ];

  const formats = ["2D", "3D", "IMAX"];

  const getRandom = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const getDistance = () =>
    (Math.random() * 5 + 1).toFixed(1);

  const getTime = () => {
    const times = [
      "10:30 AM",
      "1:15 PM",
      "4:15 PM",
      "7:30 PM",
      "10:45 PM",
    ];
    return getRandom(times);
  };

  const getSeats = () => {
    const n = Math.floor(Math.random() * 60);

    if (n < 15) {
      return { text: `Only ${n} seats left`, class: "low" };
    } else if (n < 35) {
      return { text: "Filling Fast", class: "mid" };
    } else {
      return { text: "Available", class: "high" };
    }
  };

  const getBookings = () =>
    Math.floor(Math.random() * 40) + 10;

  useEffect(() => {
    loadTheatre(type);
  }, [type]);

  async function loadTheatre(currentType = "trending") {
    setLoading(true);

    try {
      let data = await getMovies("/movie/now_playing?region=IN");

      // SORTING
      if (currentType === "fast") {
        data = data.sort((a, b) => b.popularity - a.popularity);
      } else if (currentType === "top") {
        data = data
          .filter((m) => m.vote_count > 200)
          .sort((a, b) => b.vote_average - a.vote_average);
      } else {
        data = data.sort((a, b) => b.popularity - a.popularity);
      }

      setMovies(data.slice(0, 20));
    } catch (err) {
      console.error(err);
      setMovies([]);
    }

    setLoading(false);
  }

  function toggleAdd(id) {
    setAdded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <section>

      {/* TABS */}
      <div className="theatre-tabs">
        <button
          className={`theatre-tab ${type === "trending" ? "active" : ""}`}
          onClick={() => setType("trending")}
        >
          🔥 Trending
        </button>

        <button
          className={`theatre-tab ${type === "top" ? "active" : ""}`}
          onClick={() => setType("top")}
        >
          ⭐ Top Rated
        </button>

        <button
          className={`theatre-tab ${type === "fast" ? "active" : ""}`}
          onClick={() => setType("fast")}
        >
          🎟 Fast Filling
        </button>
      </div>

      {/* CONTENT */}
      <div id="theatreList">

        {loading && (
          <p style={{ color: "#aaa", padding: "20px" }}>
            Loading movies...
          </p>
        )}

        {!loading && movies.length === 0 && (
          <p style={{ color: "red", padding: "20px" }}>
            Failed to load
          </p>
        )}

        {!loading &&
          movies.map((movie) => {
            const title = movie.title || "No Title";

            const poster = movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" +
                movie.poster_path
              : "https://via.placeholder.com/500x750?text=No+Image";

            const rating =
              movie.vote_average?.toFixed(1) || "0";

            let tag = "🔥 Trending";
            if (type === "top") tag = "⭐ Top Rated";
            if (type === "fast") tag = "🎟 Fast Filling";

            const theatre = getRandom(theatres);
            const distance = getDistance();
            const time = getTime();
            const format = getRandom(formats);
            const seats = getSeats();
            const bookings = getBookings();

            const hours = Math.floor(Math.random() * 3) + 1;
            const mins = Math.floor(Math.random() * 50) + 10;

            return (
              <div key={movie.id} className="theatre-card">

                <div className="poster-box">

                  <img src={poster} alt={title} loading="lazy" />

                  <div
                    className="add-btn"
                    onClick={() => toggleAdd(movie.id)}
                  >
                    {added[movie.id] ? "✓" : "+"}
                  </div>

                  <div className="poster-overlay">

                    <div className="top-row">
                      <span className="rating">⭐ {rating}</span>
                      <span className="tag">{tag}</span>
                    </div>

                    <h3 className="movie-title">{title}</h3>

                    <p className="theatre">
                      📍 {theatre} • {distance} km
                    </p>

                    <p className="time">
                      🕒 {time} • Today
                    </p>

                    <div className="badges">
                      <span className={`seat ${seats.class}`}>
                        {seats.text}
                      </span>
                      <span className="format">{format}</span>
                    </div>

                    <p className="booking">
                      👥 Booked {bookings} times in last hour
                    </p>

                    <div className="divider"></div>

                    <p className="now-playing">
                      🟢 Now Playing • {hours}h {mins}m left
                    </p>

                    <div className="actions">

                      <a
                        href={`/booking/${movie.id}`}
                        className="book-btn"
                      >
                        🎟 Book Tickets
                      </a>

                      <a
                        href={`/movie/${movie.id}`}
                        className="info-btn"
                      >
                        ℹ View Info
                      </a>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}
      </div>
    </section>
  );
      }
