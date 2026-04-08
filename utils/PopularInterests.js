"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";

export default function PopularInterests() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopularInterests();
  }, []);

  /* ---------------- SHUFFLE ---------------- */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async function loadPopularInterests() {
    setLoading(true);

    const sections = [
      "/discover/movie?with_original_language=hi&sort_by=popularity.desc",
      "/discover/movie?with_original_language=ta|te|ml|kn&sort_by=popularity.desc",
      "/discover/movie?with_genres=18&sort_by=popularity.desc",
      "/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc",
      "/discover/tv?sort_by=popularity.desc",
      "/trending/movie/week",
      "/movie/top_rated",
      "/discover/movie?with_genres=28&sort_by=popularity.desc",
      "/discover/movie?with_genres=35&sort_by=popularity.desc",
      "/discover/movie?with_genres=10749&sort_by=popularity.desc",
      "/discover/movie?with_genres=27&sort_by=popularity.desc",
      "/discover/movie?with_genres=53&sort_by=popularity.desc",
      "/discover/movie?with_genres=878&sort_by=popularity.desc",
      "/discover/movie?with_genres=10751&sort_by=popularity.desc",
      "/discover/movie?with_original_language=en&vote_count.gte=500&sort_by=popularity.desc",
      "/discover/movie?vote_count.gte=2000&sort_by=vote_average.desc",
      "/discover/movie?primary_release_date.gte=2024-01-01&sort_by=popularity.desc",
      "/discover/movie?vote_average.gte=7&vote_count.gte=200&sort_by=vote_count.asc",
    ];

    try {
      const results = await Promise.all(
        sections.map((endpoint) => getMovies(endpoint))
      );

      let allMovies = results.flat();

      // REMOVE DUPLICATES
      let uniqueMovies = Array.from(
        new Map(allMovies.map((m) => [m.id, m])).values()
      );

      // RANDOM MIX
      shuffleArray(uniqueMovies);

      setMovies(uniqueMovies.slice(0, 80));
    } catch (err) {
      console.log(err);
      setMovies([]);
    }

    setLoading(false);
  }

  return (
    <section>
      <div id="popularRow">

        {loading && (
          <div style={{ color: "#888", padding: "10px" }}>
            Loading...
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div>Failed to load 😔</div>
        )}

        {!loading &&
          movies.map((movie) => {
            const poster = movie.poster_path
              ? "https://image.tmdb.org/t/p/w342" +
                movie.poster_path
              : "https://via.placeholder.com/300x450?text=No+Poster";

            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A";

            const year = movie.release_date
              ? movie.release_date.split("-")[0]
              : movie.first_air_date
              ? movie.first_air_date.split("-")[0]
              : "";

            const title =
              movie.title || movie.name || "No Title";

            return (
              <div key={movie.id} className="imdb-card">

                <div className="imdb-poster">
                  <img src={poster} alt={title} />
                </div>

                <div className="imdb-info">
                  <h4>{title}</h4>
                  <div className="meta">
                    {year} • ⭐ {rating}
                  </div>
                </div>

              </div>
            );
          })}
      </div>
    </section>
  );
}
