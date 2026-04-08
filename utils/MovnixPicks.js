"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function MovnixPicks() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadMovnixPicks();
  }, []);

  async function loadMovnixPicks() {
    try {
      const data = await getMovies(
        "/discover/movie?with_origin_country=IN&sort_by=vote_average.desc"
      );

      setMovies(data.slice(0, 12));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <div className="movnix-picks">
        {movies.map((movie) => {
          const poster = movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Poster";

          const rating = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "0";

          return (
            <div key={movie.id} className="picks-card">

              <img src={poster} alt={movie.title} />

              <div className="picks-info">

                <div className="picks-rating">
                  ⭐ {rating}
                  <span className="rate-star">★</span>
                </div>

                <div className="picks-title-text">
                  {movie.title}
                </div>

                <button
                  className="picks-btn"
                  onClick={() => router.push(`/watch/${movie.id}`)}
                >
                  Watch Options
                </button>

                <button
                  className="picks-btn"
                  onClick={() => router.push(`/watchlist/${movie.id}`)}
                >
                  + Watchlist
                </button>

              </div>

              <div className="picks-actions">

                <button
                  onClick={() => router.push(`/trailer/${movie.id}`)}
                >
                  ▶
                </button>

                <button
                  className="info-btn"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  i
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
    }
