"use client";

import { useState } from "react";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const searchMovie = () => {
    const input = document.getElementById("searchInput")?.value;
    if (!input) return;

    window.location.href = `/search?q=${encodeURIComponent(input)}`;
  };

  return (
    <>
      {/* HEADER */}
      <section className="header">

        {/* TOP BAR */}
        <div className="top-bar">
          
          <div className="left">
            <div className="menu-btn" onClick={toggleMenu}>☰</div>
            <div className="logo">Mov<span>nix</span></div>
          </div>

          <div className="right">

            {/* SEARCH */}
            <div className="search-box">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Search movies..." 
              />
              <span onClick={searchMovie}>🔍</span>
            </div>

            {/* AUTH */}
            <div className="auth">
              <button className="login">Login</button>
              <button className="signup">Sign Up</button>
            </div>

          </div>
        </div>

        {/* NAV */}
        <div className="nav">
          <a href="#" className="active">Home</a>
          <a href="#">Movies</a>
          <a href="#">Series</a>
        </div>

      </section>

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <h2>Categories</h2>
        <a href="#">Trending</a>
        <a href="#">Top Rated</a>
        <a href="#">Action</a>
        <a href="#">Comedy</a>
        <a href="#">Drama</a>
        <a href="#">Horror</a>
        <a href="#">TV shows</a>
        <a href="#">Movies</a>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div className="overlay" onClick={closeMenu}></div>
      )}

      {/* EXPLORE BANNER */}
      <section id="exploreBanner" className="explore-banner">

        {/* BACKDROP */}
        <img id="exploreImg" src="" alt="banner" />

        {/* OVERLAY */}
        <div className="banner-overlay"></div>

        {/* GLASS CARD */}
        <div className="glass-card">

          <h2 id="exploreTitle"></h2>

          <a id="exploreBtn" href="#">
            Explore Now ▶
          </a>

        </div>

      </section>
    </>
  );
      }
