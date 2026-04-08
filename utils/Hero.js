"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const router = useRouter();

  // LOAD HERO DATA
  useEffect(() => {
    loadHero();
  }, []);

  async function loadHero() {
    try {
      let data = await getMovies(
        "/discover/movie?with_origin_country=IN&primary_release_date.gte=2024-01-01&sort_by=popularity.desc"
      );

      data = data.filter((m) => m.backdrop_path);
      data = data.slice(0, 20);

      setMovies(data);
    } catch (err) {
      console.error("Hero load error", err);
    }
  }

  // SLIDER LOGIC (EXACT SAME)
  useEffect(() => {
    if (movies.length === 0) return;

    const timer = setInterval(() => {
      setHeroIndex((prev) => {
        let nextIndex = prev + 1;
        if (nextIndex >= movies.length) nextIndex = 0;
        return nextIndex;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <div className="hero">
      {movies.map((movie, i) => {
        const poster = movie.poster_path
          ? "https://image.tmdb.org/t/p/w342" + movie.poster_path
          : "https://via.placeholder.com/300x450?text=No+Poster";

        const backdrop = movie.backdrop_path
          ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
          : "";

        const rating = movie.vote_average
          ? movie.vote_average.toFixed(1)
          : "0";

        const likes = Math.floor(movie.popularity * 12);
        const saves = Math.floor(movie.popularity * 6);

        // CLASS LOGIC (SAME AS YOUR JS)
        let className = "hero-slide";

        if (i === heroIndex) {
          className += " active";
        } else if (
          i === (heroIndex + 1) % movies.length
        ) {
          className += " next";
        } else if (
          i === (heroIndex - 1 + movies.length) % movies.length
        ) {
          className += " exit";
        }

        return (
          <div key={movie.id} className={className}>
            
            {/* BACKDROP */}
            <div className="hero-video">
              <img src={backdrop} alt={movie.title} />
            </div>

            {/* POSTER */}
            <img
              className="hero-poster"
              src={poster}
              alt={movie.title}
            />

            {/* INFO */}
            <div className="hero-info">
              <h2>{movie.title}</h2>

              <div className="hero-rating">
                ⭐ {rating}
              </div>

              <p>{movie.overview || ""}</p>

              <div className="hero-buttons">
                <button
                  className="hero-trailer-btn"
                  onClick={() =>
                    router.push(`/trailer/${movie.id}`)
                  }
                >
                  ▶ Trailer
                </button>

                <div className="icon-btn">❤️</div>
                <div className="hero-count">{likes}</div>

                <div className="icon-btn">🔖</div>
                <div className="hero-count">{saves}</div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
  }
