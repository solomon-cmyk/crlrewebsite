export function FilmBand() {
  return (
    <section className="block filmband">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The Film</span>
          <span className="rule" />
          <h2>
            A closer <em>look</em>
          </h2>
          <p>Step inside the residences, the beach club, and the canopy.</p>
        </div>
        <div className="film reveal">
          <video
            controls
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://www.maraveresidences.com/Marave%20Final%20Renders/Villa/H_OC_Exterior_18_Villas_Pool.jpg"
          >
            <source
              src="https://www.maraveresidences.com/Marave%20Final%20Renders/videos/residences-hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
