"use client";

import { useEffect } from "react";

export default function TrailerSection() {

  useEffect(() => {
    loadTrailers(); // tumhara existing JS function
  }, []);

  return (
    <section className="section">

      <div className="section-head common-head">

        <div>
          <h2 className="section-title">
            <a href="/trailers" className="title-link">
              Latest Movie Trailers
            </a>
          </h2>

          <a href="/trailers" className="seo-link">
            Upcoming Movies Trailers
          </a>
        </div>

        <a href="/trailers" className="trailer-see-btn see-all-btn">
          See All
        </a>

      </div>

      {/* DYNAMIC ROW */}
      <div className="trailer-row" id="trailers"></div>

    </section>
  );
        }
