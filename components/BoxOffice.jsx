export default function BoxOffice() {
  return (
    <section id="boxOfficeSection" className="box-office">

      {/* HEADER */}
      <div className="box-header common-head">

        <div>
          <h2 className="section-title">
            <a href="/box-office" className="title-link">
              Top box office
              <span className="arrow"></span>
            </a>
          </h2>

          <p className="seo-link">
            Latest theatrical performance
          </p>
        </div>

      </div>

      {/* TABS */}
      <div className="box-tabs">

        <button className="box-tab active" data-tab="india">
          India
        </button>

        <button className="box-tab" data-tab="world">
          Worldwide
        </button>

        <button className="box-tab" data-tab="opening">
          Opening
        </button>

      </div>

      {/* LIST */}
      <div id="boxOfficeList" className="box-list">

        {/* DEFAULT FALLBACK ROW (JS replace karega) */}
        <div className="box-row">

          <div className="box-rank">1</div>

          <div className="box-add">+</div>

          <div className="box-info">
            <h3 className="box-movie-name">Movie Name</h3>
            <div className="box-earnings">₹100 Cr</div>
          </div>

          <div className="box-ticket">🎟</div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="box-footer">
        <button className="box-more">
          See full rankings →
        </button>
      </div>

    </section>
  );
}
