export default function MovnixFinal() {
  return (
    <section className="movnix-final">

      <div className="movnix-container">

        {/* LEFT CONTENT */}
        <div className="movnix-left">
          <h1>🔥 Watch on <span>MOVNIX</span></h1>
          <p>Your ultimate destination for movies, TV shows & exclusive updates.</p>

          <div className="movnix-buttons">
            <button className="btn primary">▶ Explore Movies</button>
            <button className="btn secondary">★ Trending Now</button>
          </div>
        </div>

        {/* RIGHT POSTERS */}
        <div className="movnix-posters">
          <img
            src="https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
            loading="lazy"
            alt="poster"
          />
          <img
            src="https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
            className="center"
            loading="lazy"
            alt="poster"
          />
          <img
            src="https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg"
            loading="lazy"
            alt="poster"
          />
        </div>

      </div>

      {/* SUBSCRIBE */}
      <div className="subscribe-box">
        <h2>📩 Subscribe to Movnix Updates</h2>
        <p>Get latest movie news & trending updates.</p>

        <div className="subscribe-input">
          <input type="email" placeholder="Enter your email..." />
          <button>Subscribe</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="movnix-footer">

        <div className="footer-left">
          <h2>MOVNIX</h2>
          <p>Discover. Watch. Stay Updated.</p>
        </div>

        <div className="footer-links">

          <div>
            <h4>Explore</h4>
            <a href="#">Home</a>
            <a href="#">Movies</a>
            <a href="#">TV Shows</a>
          </div>

          <div>
            <h4>Community</h4>
            <a href="#">News</a>
            <a href="#">Help Center</a>
          </div>

          <div>
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

        </div>

      </footer>

    </section>
  );
}
