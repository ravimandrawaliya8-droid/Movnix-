"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    try {
      const data = await getMovies(
        "/discover/movie?with_origin_country=IN&primary_release_date.gte=2024-01-01&sort_by=popularity.desc&vote_count.gte=200"
      );

      setMovies(data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <div className="trendingList">
        {movies.map((movie, index) => {

          const poster = movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Poster";

          const rating = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "0";

          const votes = movie.vote_count
            ? Math.floor(movie.vote_count / 1000) + "K"
            : "0";

          // SAME RANDOM WATCH TIME
          const totalSeconds =
            Math.floor(Math.random() * 5400) + 5400;

          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          const watchTime = `${hours}h ${minutes}m ${seconds}s`;

          let trend = Math.round(
            movie.popularity / 10 + movie.vote_average * 5
          );

          if (trend > 100) trend = 100;

          return (
            <div key={movie.id} className="trend-card">

              <div className="rank">#{index + 1}</div>

              <div className="trend-poster">
                <img src={poster} alt={movie.title} />
                <div className="watch-icon">+</div>
              </div>

              <div className="trend-info">

                <h3>{movie.title}</h3>

                <div className="meta">
                  {movie.release_date} • {watchTime}
                </div>

                <div className="rating-row">

                  <div className="rating">
                    ⭐ {rating} ({votes})
                  </div>

                  <button className="rate-btn-small">
                    Rate
                  </button>

                </div>

                <div className="trend-score">
                  🔥 {trend}% Trend Score
                </div>

                <div className="trend-actions">

                  <button
                    className="btn"
                    onClick={() =>
                      router.push(`/trailer/${movie.id}`)
                    }
                  >
                    ▶ Trailer
                  </button>

                  <button
                    className="btn"
                    onClick={() =>
                      router.push(`/watchlist/${movie.id}`)
                    }
                  >
                    🔖 Watchlist
                  </button>

                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
          }
