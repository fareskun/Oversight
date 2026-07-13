import './Process.css'

const steps = [
  { num: '01 · AUDIT', title: 'We study the system as it exists.', text: 'Workflows, data, existing code, and where it\'s actually breaking down — before we propose anything.' },
  { num: '02 · BUILD', title: 'Engineering sprints, weekly demos.', text: 'You see working software every week, not a status deck. Scope changes are discussed, not hidden.' },
  { num: '03 · OVERSEE', title: 'We stay on after launch.', text: 'Monitoring, SLAs, and a direct line to the engineers who built it — not a ticket queue.' },
]

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">How We Work</div>
          <h2>Every project follows the same protocol.</h2>
          <p>The same three phases, whether it's a six-week tool or a two-year platform.</p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
