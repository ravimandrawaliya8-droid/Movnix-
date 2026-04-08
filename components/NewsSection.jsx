export default function NewsSection() {
  return (
    <section className="news-section" id="newsSection">

      {/* HEADER */}
      <div className="news-header">
        <h2>📰 Top News</h2>
      </div>

      {/* ⭐ HERO NEWS */}
      <div className="news-hero">

        <img src="https://via.placeholder.com/800x500" alt="news" />

        <div className="overlay"></div>

        <div className="hero-content">
          <span className="tag">⭐ TOP STORY</span>

          <h3>Zendaya Stuns at Oscars 2024 Afterparty</h3>

          <p>See all the glamorous photos from last night’s event...</p>

          <div className="hero-footer">
            <span>🗞 News • 2h ago</span>
            <button className="read-btn">Read More →</button>
          </div>
        </div>

      </div>

      {/* 🎯 CATEGORY PILLS */}
      <div className="news-pills">
        <button className="active">Top News</button>
        <button>Movies</button>
        <button>Celebs</button>
        <button>TV</button>
        <button>India</button>
        <button>Global</button>
      </div>

      {/* 📃 NEWS LIST */}
      <div className="news-list">

        <div className="news-card">
          <img src="https://via.placeholder.com/100" alt="news" />
          <div>
            <h4>New 'Spider-Man 4' Reportedly in Development</h4>
            <p>Variety • 1h ago</p>
          </div>
          <span className="arrow">→</span>
        </div>

        <div className="news-card">
          <img src="https://via.placeholder.com/100" alt="news" />
          <div>
            <h4>Ryan Gosling to Star in New Sci-Fi Thriller</h4>
            <p>Hollywood Reporter • 3h ago</p>
          </div>
          <span className="arrow">→</span>
        </div>

        <div className="news-card">
          <img src="https://via.placeholder.com/100" alt="news" />
          <div>
            <h4>Priyanka Chopra Welcomes Baby Boy</h4>
            <p>Times of India • 5h ago</p>
          </div>
          <span className="arrow">→</span>
        </div>

      </div>

      {/* 🔥 MORE NEWS */}
      <div className="more-news">
        <h3>MORE NEWS</h3>

        <div className="more-grid">
          <button>Top news</button>
          <button>Celebrity news</button>
          <button>Movie news</button>
          <button>Indie news</button>
          <button>TV news</button>
        </div>

      </div>

    </section>
  );
      }
