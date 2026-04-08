"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";

export default function FanFavourites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadFanFavourites();
  }, []);

  async function loadFanFavourites() {
    try {
      // FETCH 2 PAGES
      const [page1, page2] = await Promise.all([
        getMovies(
          "/discover/movie?with_origin_country=IN&vote_count.gte=1000&sort_by=popularity.desc&page=1"
        ),
        getMovies(
          "/discover/movie?with_origin_country=IN&vote_count.gte=1000&sort_by=popularity.desc&page=2"
        ),
      ]);

      // MERGE
      let data = [...page1, ...page2];

      // REMOVE LOW RATING
      data = data.filter((m) => m.vote_average >= 6.5);

      // REMOVE DUPLICATES
      const map = new Map();
      data.forEach((m) => {
        if (!map.has(m.id)) {
          map.set(m.id, m);
        }
      });

      data = [...map.values()];

      // SORT BY FAN SCORE
      data.sort((a, b) => {
        const scoreA = a.vote_average * 10 + a.popularity;
        const scoreB = b.vote_average * 10 + b.popularity;
        return scoreB - scoreA;
      });

      // TOP 20
      setMovies(data.slice(0, 20));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="fanFavourites">
      {movies.map((movie) => {
        const poster = movie.poster_path
          ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
          : "https://via.placeholder.com/500x750?text=No+Poster";

        const rating = movie.vote_average
          ? movie.vote_average.toFixed(1)
          : "0";

        return (
          <div key={movie.id} className="fan-card">

            <div className="fan-poster">
              <img src={poster} alt={movie.title} />
              <div className="watchlist-icon">+</div>
            </div>

            <div className="fan-info">

              <div className="fan-rating">
                ⭐ {rating}
              </div>

              <h3 className="fan-title">
                {movie.title}
              </h3>

              {/* SAME AS OLD <a> */}
              <a
                href={`/watch/${movie.id}`}
                className="fan-watch-btn"
              >
                Watch
              </a>

              <div className="fan-actions">

                <a
                  href={`/trailer/${movie.id}`}
                  className="fan-trailer"
                >
                  ▶ Trailer
                </a>

                <a
                  href={`/movie/${movie.id}`}
                  className="fan-info-btn"
                >
                  ⓘ
                </a>

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
  }
