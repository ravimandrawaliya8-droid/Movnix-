"use client";

import { useEffect } from "react";

export default function MovnixPicks() {

  useEffect(() => {
    loadMovnixPicks(); // tumhara dynamic JS
  }, []);

  return (
    <section className="section picks">

      {/* HEADER */}
      <div className="picks-head">

        <div className="picks-left">

          <span className="picks-line"></span>

          <div>
            <h2 className="picks-title">Recommend Movies</h2>
            <a href="/list" className="seo-link">
              Top Picks Movies List
            </a>
          </div>

          <span className="arrow"></span>

        </div>

        <a href="/list" className="picks-list-btn">
          See List
        </a>

      </div>

      {/* 🎬 DYNAMIC ROW */}
      <div className="movie-row picks-row" id="movnixPicks">

        {/* ⚠️ Fallback Static Card (optional) */}
        <div className="picks-card">

          <img src="/poster.jpg" alt="Movie Poster" />

          <div className="picks-info">

            <div className="picks-rating">
              ⭐ 8.2
              <span className="rate-star">★</span>
              <span className="blue-star">★</span>
            </div>

            <div className="picks-title-text">
              Movie Title Goes Here
            </div>

            <a className="picks-btn">Watch</a>

          </div>

          <div className="picks-actions">
            <a className="trailer-btn">▶ Trailer</a>
            <a className="watchlist-btn">+ Watchlist</a>
            <a className="info-btn">i</a>
          </div>

        </div>

      </div>

    </section>
  );
        }
