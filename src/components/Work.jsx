import './Work.css'

const cases = [
  {
    id: 'OV–01',
    title: 'StockFlow — Inventory & Sales System',
    brief: 'A regional wholesaler managing stock and sales through notebooks and Excel. We built a centralized system for inventory, invoices, customer balances, and low-stock alerts.',
    tags: ['Wholesale', 'Inventory', 'Invoices', 'Dashboard'],
    results: ['−70% stock discrepancies', '3h → 15 min daily reporting'],
  },
  {
    id: 'OV–02',
    title: 'Clinix — Clinic Management Platform',
    brief: 'A private clinic was handling appointments, patient records, and payments manually. We built a unified platform for scheduling, patient management, billing, and automated appointment reminders.',
    tags: ['Healthcare', 'Scheduling', 'Patient Management', 'SMS'],
    results: ['−55% missed appointments', '+40% administrative efficiency'],
  },
  {
    id: 'OV–03',
    title: 'Distrib — Delivery & Order Management',
    brief: 'A local distributor was receiving retailer orders through phone calls and WhatsApp, making tracking difficult. We built a system to centralize orders, manage delivery routes, track payments, and monitor sales in real time.',
    tags: ['Distribution', 'Orders', 'Delivery', 'Analytics'],
    results: ['−60% order-processing time', '+30% deliveries per day'],
  },
]

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Selected Work</div>
          <h2>Three systems, in production.</h2>
          <p>A sample of what we've built and continue to operate for clients today. Details anonymized at client request.</p>
        </div>
        <div className="work-list">
          {cases.map((c, i) => (
            <article className="case" key={i}>
              <div className="case-id">{c.id}<span className="status">In production</span></div>
              <div className="case-body">
                <h3>{c.title}</h3>
                <p className="brief">{c.brief}</p>
                <div className="tags">
                  {c.tags.map((t, j) => <span className="tag" key={j}>{t}</span>)}
                </div>
              </div>
              <div className="case-results">
                {c.results.map((r, j) => (
                  <div className="result-row" key={j}>
                    <div className="num">{r}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}