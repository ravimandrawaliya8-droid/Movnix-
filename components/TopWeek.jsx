"use client";

import { useEffect } from "react";

export default function TopWeek() {

  useEffect(() => {
    loadTopWeek();        // tumhara main function
    initTopWeekEvents();  // buttons + search system
  }, []);

  return (
    <section className="section" id="top-week-section">

      {/* HEADER */}
      <div className="section-head">

        <div className="left">
          <h2>🔥 Top This Week</h2>
          <span className="sub">Real-time trends by region</span>
        </div>

        <a href="/topweek" className="view-all-btn">View All</a>

      </div>

      {/* 🔍 SEARCH */}
      <div className="country-search">
        <input 
          type="text" 
          id="countrySearchInput"
          placeholder="Search country (India, USA...)"
          autoComplete="off"
        />
      </div>

      {/* 🌍 COUNTRY BUTTONS */}
      <div className="country-scroll" id="countryScroll">

        <button className="country-btn active" data-region="WORLD">🌍 Worldwide</button>
        <button className="country-btn" data-region="IN">🇮🇳 India</button>
        <button className="country-btn" data-region="US">🇺🇸 USA</button>
        <button className="country-btn" data-region="KR">🇰🇷 Korea</button>
        <button className="country-btn" data-region="JP">🇯🇵 Japan</button>
        <button className="country-btn" data-region="GB">🇬🇧 UK</button>
        <button className="country-btn" data-region="FR">🇫🇷 France</button>
        <button className="country-btn" data-region="DE">🇩🇪 Germany</button>
        <button className="country-btn" data-region="BR">🇧🇷 Brazil</button>
        <button className="country-btn" data-region="ES">🇪🇸 Spain</button>

      </div>

      {/* 🎬 MOVIE ROW */}
      <div className="movie-row" id="top-week-container">

        {/* Skeleton Loader */}
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>

      </div>

    </section>
  );
          }
