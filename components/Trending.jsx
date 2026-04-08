"use client";

import { useEffect } from "react";

export default function Trending() {

  useEffect(() => {
    loadTrending(); // tumhara JS function
  }, []);

  return (
    <section className="trending-section">

      {/* HEADER */}
      <div className="common-head">

        <div>

          <h2 className="section-title">
            <a href="/trending" className="title-link">
              Trending Movies Now
            </a>
          </h2>

          <a href="/trending" className="seo-link">
            Discover trending movies worldwide
          </a>

        </div>

      </div>

      {/* MOVIES LIST */}
      <div className="trending-list" id="trendingList"></div>

      {/* SEE ALL */}
      <div className="trend_seeall">
        <a href="/trending" className="see-btn">
          See All
        </a>
      </div>

    </section>
  );
          }
