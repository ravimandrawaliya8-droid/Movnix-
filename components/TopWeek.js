"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IMG_BASE = "https://image.tmdb.org/t/p/w780";
const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";

export default function TopWeek() {
  const [movies, setMovies] = useState([]);
  const [region, setRegion] = useState("IN");
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchTopThisWeek(region);
  }, [region]);

  async function fetchTopThisWeek(region = "IN") {
    try {
      let url;

      if (region === "WORLD") {
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_origin_country=${region}&sort_by=popularity.desc&vote_count.gte=50`;
      }

      const res = await fetch(url);
      const data = await res.json();

      let movies = data.results
        ?.filter((m) => m && (m.poster_path || m.backdrop_path))
        ?.slice(0, 10) || [];

      movies.sort((a, b) => b.popularity - a.popularity);

      movies = handleRankChange(movies, region);

      setMovies(movies);
    } catch {
      setMovies([]);
    }
  }

  function handleRankChange(movies, region) {
    const key = `lastWeek_${region}`;
    const oldData = JSON.parse(localStorage.getItem(key));

    if (oldData) {
      movies.forEach((movie, index) => {
        const oldIndex = oldData.findIndex((m) => m.id === movie.id);

        if (oldIndex === -1) {
          movie.rankChange = "🆕";
        } else {
          const diff = oldIndex - index;
          movie.rankChange =
            diff === 0
              ? "➖"
              : diff > 0
              ? `⬆️ ${diff}`
              : `⬇️ ${Math.abs(diff)}`;
        }
      });
    } else {
      movies.forEach((m) => (m.rankChange = "🆕"));
    }

    localStorage.setItem(key, JSON.stringify(movies));
    return movies;
  }

  function saveUserRating(id, rating) {
    let ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
    ratings[id] = rating;
    localStorage.setItem("userRatings", JSON.stringify(ratings));
  }

  function toggleWatchlist(id) {
    let list = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (list.includes(id)) {
      list = list.filter((item) => item !== id);
    } else {
      list.push(id);
    }

    localStorage.setItem("watchlist", JSON.stringify(list));
    fetchTopThisWeek(region);
  }

  async function openTrailer(movieId) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const data = await res.json();

      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        window.open(`https://youtube.com/watch?v=${trailer.key}`);
      } else {
        alert("Trailer not available");
      }
    } catch {
      alert("Error loading trailer");
    }
  }

  const userRatings =
    JSON.parse(localStorage.getItem("userRatings")) || {};

  const watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];

  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "USA" },
    { code: "KR", name: "Korea" },
    { code: "JP", name: "Japan" },
    { code: "WORLD", name: "Worldwide" },
  ];

  return (
    <section>
      <h2>🔥 Top This Week</h2>

      {/* SEARCH */}
      <input
        placeholder="Search country..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {/* BUTTONS */}
      <div className="country-buttons">
        {countries
          .filter(
            (c) =>
              c.code.toLowerCase().includes(search) ||
              c.name.toLowerCase().includes(search)
          )
          .map((c) => (
            <button
              key={c.code}
              className={`country-btn ${
                region === c.code ? "active" : ""
              }`}
              onClick={() => setRegion(c.code)}
            >
              {c.name}
            </button>
          ))}
      </div>

      {/* MOVIES */}
      <div className="top-week-container">
        {movies.map((movie, index) => {
          const poster = movie.poster_path
            ? IMG_BASE + movie.poster_path
            : FALLBACK_POSTER;

          const userRating = userRatings[movie.id] || "";
          const isSaved = watchlist.includes(movie.id);

          return (
            <div key={movie.id} className="movie-card">
              <div className="card">

                <div
                  className={`watchlist ${isSaved ? "active" : ""}`}
                  onClick={() => toggleWatchlist(movie.id)}
                >
                  ❤️
                </div>

                <div
                  className="poster-click"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <img src={poster} />
                </div>

                <div className="rank">#{index + 1}</div>

                <div className="info">
                  <h3>{movie.title}</h3>

                  <div className="meta">
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>

                    <button
                      onClick={() => {
                        let rating = prompt("Rate 1-10");
                        if (!rating) return;
                        rating = Number(rating);
                        if (rating < 1 || rating > 10) return;
                        saveUserRating(movie.id, rating);
                        fetchTopThisWeek(region);
                      }}
                    >
                      ⭐ {userRating}
                    </button>
                  </div>

                  <div className="extra">
                    <span>
                      {movie.release_date?.slice(0, 4) || "N/A"}
                    </span>

                    <div className="actions">
                      <button
                        onClick={() =>
                          router.push(`/movie/${movie.id}`)
                        }
                      >
                        Info
                      </button>

                      <button>▶ Watch</button>

                      <button
                        onClick={() => openTrailer(movie.id)}
                      >
                        🎬 Trailer
                      </button>
                    </div>

                    <span className="rank-change">
                      {movie.rankChange}
                    </span>
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
