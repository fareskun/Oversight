import './Capabilities.css'

const cards = [
  {
    icon: <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 14h3" /></svg>,
    title: 'Custom Software Engineering',
    text: 'Full-stack builds shaped around how your operation actually runs, not a boilerplate you\'ll fight for years.',
  },
  {
    icon: <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" /><path d="M9 12l2 2 4-4" /></svg>,
    title: 'Systems Architecture',
    text: 'We design the backbone — data model, infra, integrations — before a single line of feature code is written.',
  },
  {
    icon: <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 17V7l8-4 8 4v10l-8 4-8-4z" /><path d="M4 7l8 4 8-4M12 11v10" /></svg>,
    title: 'Product Engineering',
    text: 'From working prototype to production release, owned end to end by the same team that scoped it.',
  },
  {
    icon: <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></svg>,
    title: 'Quality Oversight &amp; Audit',
    text: 'Code review, security audits, and ongoing performance monitoring long after the launch party ends.',
  },
]

export default function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Capabilities</div>
          <h2>Four disciplines. One accountable team.</h2>
          <p>Most agencies hand off a build and disappear. We keep the same engineers on your system from architecture through the years after launch.</p>
        </div>
        <div className="cap-grid">
          {cards.map((c, i) => (
            <div className="cap-card" key={i}>
              {c.icon}
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
