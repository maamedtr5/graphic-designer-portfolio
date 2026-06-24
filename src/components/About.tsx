import { SITE_CONFIG } from "../config";

export function About() {
  const { about, name } = SITE_CONFIG;
  return (
    <section id="about" className="about-section">
      <div className="about-section__tape" />
      <div className="about-section__inner">
        <div className="about-section__left">
          <span className="about-section__eyebrow"> about me</span>
          <h2 className="about-section__headline">{about.headline}</h2>
          <div className="about-section__sig">— {name.first} {name.last}</div>
        </div>
        <div className="about-section__right">
          {about.body.map((p, i) => <p key={i} className="about-section__body">{p}</p>)}
          <div className="about-section__sticker">
            <span>✦</span>
            <span>Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}