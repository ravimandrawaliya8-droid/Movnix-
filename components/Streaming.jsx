export default function Streaming() {
  return (
    <section className="streaming-section" id="streamingSection">

      {/* HEADER */}
      <div className="stream-header">

        <div>
          <h2 className="stream-title">
            <a href="/streaming" className="title-link">
              Available on Streaming Platforms
            </a>
          </h2>

          <a href="/streaming" className="seo-link">
            Watch movies and shows from multiple streaming platforms in one place
          </a>
        </div>

        <div className="stream-preference">
          <span className="gear">⚙</span>
          <span>Set your preferred services</span>
        </div>

      </div>

      {/* TABS */}
      <div className="stream-tabs">

        <button className="stream-tab active" data-tab="prime">PRIME VIDEO</button>
        <button className="stream-tab" data-tab="netflix">NETFLIX</button>
        <button className="stream-tab" data-tab="hotstar">JIOHOTSTAR</button>
        <button className="stream-tab" data-tab="apple">APPLE TV</button>
        <button className="stream-tab" data-tab="sony">SONY LIV</button>
        <button className="stream-tab" data-tab="zee">ZEE5</button>
        <button className="stream-tab" data-tab="mx">MX PLAYER</button>

      </div>

      {/* SUB TEXT */}
      <div className="stream-sub">
        with subscription
      </div>

      {/* CONTENT */}
      <div className="stream-row" id="streamRow">
        <div style={{ color: "#888", fontSize: "14px" }}>
          Loading content...
        </div>
      </div>

    </section>
  );
      }
