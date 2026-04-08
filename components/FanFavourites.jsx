"use client";

import { useEffect } from "react";

export default function FanFavourites() {

  useEffect(() => {
    loadFanFavourites(); // tumhara smart filter wala function
  }, []);

  return (
    <section className="section fan-section section-light">

      {/* HEADER */}
      <div className="common-head">

        <div>

          <h2 className="section-title">
            <a href="/fan" className="title-link">
              Fan Favourite
            </a>
          </h2>

          <a href="/fan" className="seo-link">
            IMDb Top Rated Movies
          </a>

        </div>

        <a href="/fan" className="see-all-btn">
          See All
        </a>

      </div>

      {/* MOVIE ROW */}
      <div className="movie-row fan-row" id="fanFavourites"></div>

    </section>
  );
      }
