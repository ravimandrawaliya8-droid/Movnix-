"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function TrailerSection() {
  const [trailers, setTrailers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadTrailers();
  }, []);

  async function loadTrailers() {
    try {
      const movies1 = await getMovies(
        "/discover/movie?with_origin_country=IN&sort_by=popularity.desc&page=1"
      );

      const movies2 = await getMovies(
        "/discover/movie?with_origin_country=IN&sort_by=popularity.desc&page=2"
      );

      const movies = [...movies1, ...movies2];

      let results = [];
      let count = 0;

      for (const movie of movies) {
        if (count >= 30) break;

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        const data = await res.json();

        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        if (!trailer) continue;

        const thumb = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;

        results.push({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          popularity: movie.popularity,
          thumb,
        });

        count++;
      }

      setTrailers(results);
    } catch (err) {
      console.error("Trailer load error", err);
    }
  }

  return (
    <section className="trailer-section">
      <h2>🔥 Latest Trailers</h2>

      <div className="trailer-grid">
        {trailers.map((movie) => (
          <div
            key={movie.id}
            className="trailer-card"
            onClick={() => router.push(`/trailer/${movie.id}`)}
          >
            <div className="trailer-thumb">
              <img src={movie.thumb} alt={movie.title} />
              <div className="play-sm">▶</div>
            </div>

            <p>{movie.title}</p>

            <div className="trailer-meta">
              <span>⭐ {movie.rating.toFixed(1)}</span>
              <span>🔥 {Math.round(movie.popularity)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
        }
