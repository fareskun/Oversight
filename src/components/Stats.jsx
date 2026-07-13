import './Stats.css'

const stats = [
  { num: '48', suffix: '', label: 'Systems shipped to production' },
  { num: '6.4', suffix: ' yrs', label: 'Average client relationship' },
  { num: '99.98', suffix: '%', label: 'Production uptime, trailing 12mo' },
  { num: '0', suffix: '', label: 'Missed launch dates, to date' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="num"><span>{s.num}</span>{s.suffix}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
