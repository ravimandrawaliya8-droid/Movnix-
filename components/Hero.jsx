"use client";

import { useEffect } from "react";

export default function Hero() {

  useEffect(() => {
    loadHero();
  }, []);

  return (
    <section id="hero">

      <div className="hero-card">

        {/* BACKDROP VIDEO / IMAGE */}
        <div className="hero-video" id="heroBackdrop"></div>

        {/* POSTER */}
        <img className="hero-poster" id="heroPoster" alt="poster" />

        {/* INFO */}
        <div className="hero-info">

          <h2 id="heroTitle"></h2>

          <p id="heroOverview"></p>

          <div className="hero-buttons">

            <a href="/trailer" className="trailer-btn">
              ▶ Watch Trailer
            </a>

            <a href="/watchlist" className="icon-btn">
              ♡
            </a>

            <a href="/watchlist" className="icon-btn">
              🔖
            </a>

          </div>

        </div>

      </div>

    </section>
  );
        }
