export default function Theatre() {
  return (
    <section id="theatreReleases" className="theatre-section">

      {/* HEADER */}
      <div className="theatre-header">

        <div className="title-row">
          <span className="title-icon">🎬</span>
          <h2 className="title-text">In Theaters Near You</h2>
        </div>

        <p className="subtitle">
          Catch the biggest films on big screen
        </p>

        {/* TABS */}
        <div className="theatre-tabs">

          <button className="theatre-tab active" data-tab="trending">
            🔥 <span>Trending</span>
          </button>

          <button className="theatre-tab" data-tab="fast">
            🎟 <span>Fast Filling</span>
          </button>

          <button className="theatre-tab" data-tab="top">
            ⭐ <span>Top Rated</span>
          </button>

        </div>

      </div>

      {/* MOVIE LIST */}
      <div id="theatreList" className="theatre-row"></div>

      {/* OTHER THEATRES */}
      <div className="other-theatres">

        <p className="other-text">
          Also showing in <strong>8</strong> other theatres nearby:
        </p>

        <div className="theatre-chips">
          <span className="chip active">PVR</span>
          <span className="chip">INOX</span>
          <span className="chip">Cinépolis</span>
          <span className="chip">Miraj Cinemas</span>
          <span className="chip">Moviemax</span>
        </div>

      </div>

    </section>
  );
      }
