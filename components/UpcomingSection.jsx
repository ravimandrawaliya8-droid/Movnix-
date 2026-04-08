export default function UpcomingSection() {
  return (
    <section className="upcoming-section" id="upcomingTheatres">

      {/* HEADER */}
      <div className="upcoming-header">
        <h2>🎬 Upcoming in Theatres</h2>
        <p>Watch trailers of upcoming releases</p>
      </div>

      {/* MOVIES (JS LOAD) */}
      <div className="upcoming-row" id="upcomingList"></div>

      {/* ANTICIPATED */}
      <div className="anticipated">
        🔥 Most Anticipated • 2025–2026
      </div>

      {/* WHY SECTION */}
      <div className="why-section">

        <h3>🍿 Why You’ll Love This Section?</h3>

        <div className="why-grid">

          <div className="why-card">
            ▶ Real Trailers
            <p>Official teasers & trailers directly from TMDB</p>
          </div>

          <div className="why-card">
            📅 Release Dates
            <p>Exact theatrical release dates worldwide</p>
          </div>

          <div className="why-card">
            ❤️ Save & Track
            <p>Add movies to your watchlist & track interest</p>
          </div>

        </div>

      </div>

      {/* REMIND BOX */}
      <div className="remind-box">

        <div>
          <h4>🔔 Get Notified!</h4>
          <p>We’ll remind you before release</p>
        </div>

        {/* GLOBAL REMIND BUTTON */}
        <button className="remind-btn" data-id="global">
          Remind Me
        </button>

      </div>

    </section>
  );
      }
