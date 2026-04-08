"use client";

import { useEffect } from "react";

export default function Celebrities() {

  useEffect(() => {
    loadCelebrities();          // tumhara JS function
    activateCelebrityEffect();  // scroll center effect
  }, []);

  return (
    <section className="section">

      <div className="celeb-head">

        <span className="celeb-line"></span>

        <a href="/celebrities" className="celeb-title">
          Popular Indian Celebrities
          <span className="celeb-arrow">›</span>
        </a>

      </div>

      {/* DYNAMIC ROW */}
      <div className="celebrity-row" id="celebs"></div>

    </section>
  );
}
