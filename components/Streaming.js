"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/lib/api";

export default function Streaming() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStreaming();
  }, []);

  async function loadStreaming() {
    setLoading(true);

    const endpoints = [
      "/trending/movie/week",
      "/discover/movie?with_origin_country=IN&sort_by=popularity.desc",
      "/discover/tv?sort_by=popularity.desc",
      "/discover/movie?with_genres=18",
      "/discover/movie?with_genres=28",
      "/discover/tv?with_genres=16",
    ];

    try {
      const results = await Promise.all(
        endpoints.map((e) => getMovies(e))
      );

      let all = results.flat();

      // REMOVE DUPLICATES
      const uniqueMap = new Map();
      all.forEach((item) => {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item);
        }
      });

      all = [...uniqueMap.values()];

      // RANDOM MIX
      all.sort(() => Math.random() - 0.5);

      // FIX TOTAL = 20
      all = all.slice(0, 20);

      setItems(all);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <section>

      {/* TABS */}
      <div className="stream-tabs">
        <button className="stream-tab active">All</button>
        <button className="stream-tab">Movies</button>
        <button className="stream-tab">TV Shows</button>
      </div>

      {/* CONTENT */}
      <div id="streamRow">

        {loading && <p>Loading...</p>}

        {!loading && items.length === 0 && (
          <p>Failed to load</p>
        )}

        {!loading &&
          items.map((movie) => {
            const poster = movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" +
                movie.poster_path
              : "https://via.placeholder.com/500x750";

            const title =
              movie.title || movie.name || "No Title";

            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "0";

            return (
              <div key={movie.id} className="stream-card">

                <div className="stream-poster">
                  <img src={poster} />
                  <div className="stream-plus">+</div>
                </div>

                <div className="stream-info">

                  <div className="stream-rating">
                    ⭐ {rating}
                  </div>

                  <div className="stream-title-text">
                    {title}
                  </div>

                  <a
                    href={`/watch/${movie.id}`}
                    className="stream-btn"
                  >
                    Watch now ↗
                  </a>

                  <div className="stream-trailer">
                    ▶ Trailer
                  </div>

                </div>

              </div>
            );
          })}
      </div>
    </section>
  );
                  }
