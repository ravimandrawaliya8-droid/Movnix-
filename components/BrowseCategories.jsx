export default function BrowseCategories() {
  return (
    <section className="browse-section">

      <div className="browse-head">
        <h2>Browse Categories</h2>
      </div>

      <div className="browse-row">

        <a href="/browse?type=oscars" className="browse-chip">
          Oscars Winners ›
        </a>

        <a href="/browse?type=golden" className="browse-chip">
          Golden Globes ›
        </a>

        <a href="/browse?type=trending" className="browse-chip">
          Trending Today ›
        </a>

        <a href="/browse?type=toprated" className="browse-chip">
          Top Rated ›
        </a>

        <a href="/browse?type=new" className="browse-chip">
          New Releases ›
        </a>

        <a href="/browse?type=action" className="browse-chip">
          Action Movies ›
        </a>

        <a href="/browse?type=stars" className="browse-chip">
          Rising Stars ›
        </a>

        <a href="/browse?type=gems" className="browse-chip">
          Hidden Gems ›
        </a>

      </div>

    </section>
  );
          }
