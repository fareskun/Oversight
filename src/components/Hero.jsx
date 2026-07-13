import './Hero.css'
import GlobeCanvas from './GlobeCanvas'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <div className="eyebrow">Custom Software · Est. 2019</div>
          <h1>Software, built<br />under <em>Oversight</em>.</h1>
          <p className="lead">We design, build, and stand behind custom software for teams who can't afford to guess. No templates, no handoff-and-vanish — an engineering team that stays accountable after launch.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Request an assessment</a>
            <a href="#work" className="btn btn-ghost">View our work</a>
          </div>
          <div className="hero-trust">
            <span className="dots"><span></span><span></span><span></span></span>
            Engineered for logistics, fintech, healthcare &amp; retail operators
          </div>
        </div>
        <div className="hero-visual">
          <GlobeCanvas />
          <div className="ring-fallback"></div>
          <div className="hero-visual-caption">Live system · continuous oversight</div>
        </div>
      </div>
    </section>
  )
}
