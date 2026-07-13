import { useState, useRef } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [source, setSource] = useState('')
  const formRef = useRef(null)

  function validateField(field, input) {
    let valid = true
    if (input.hasAttribute('required') && !input.value.trim()) valid = false
    if (input.type === 'email' && input.value.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(input.value.trim())) valid = false
    }
    field.classList.toggle('invalid', !valid)
    return valid
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const form = formRef.current
    let allValid = true
    form.querySelectorAll('.field').forEach(field => {
      const input = field.querySelector('input, textarea, select')
      if (!input) return
      if (input.hasAttribute('required') || input.type === 'email') {
        if (!validateField(field, input)) allValid = false
      }
    })
    if (!allValid) return

    setSubmitting(true)
    try {
      const data = {
        name: form.querySelector('[name="name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        company: form.querySelector('[name="company"]').value.trim(),
        source: form.querySelector('[name="source"]').value === 'Other'
          ? form.querySelector('[name="sourceOther"]').value || 'Other'
          : form.querySelector('[name="source"]').value,
        message: form.querySelector('[name="message"]').value.trim(),
        createdAt: Timestamp.now(),
      }
      await addDoc(collection(db, 'submissions'), data)
      setSubmitting(false)
      setSubmitted(true)
    } catch (err) {
      setSubmitting(false)
      setError('Something went wrong. Please try again or email us directly at bouazzaamuerfares@gmail.com.')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <div className="eyebrow">Contact</div>
          <h2>Tell us what&rsquo;s broken, or what&rsquo;s next.</h2>
          <p>Submit a brief and one of our engineers &mdash; not a salesperson &mdash; will review it and follow up within one business day.</p>
          <div className="info-list">
            <div className="info-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" /><path d="M4 6l8 7 8-7" /></svg>
              <div className="t"><strong>bouazzaamuerfares@gmail.com</strong>Direct to the engineering team</div>
            </div>
            <div className="info-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              <div className="t"><strong>1 business day</strong>Typical response time on new briefs</div>
            </div>
            <div className="info-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
              <div className="t"><strong>No obligation</strong>The assessment is free; the audit tells you if we're a fit</div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-head">
            <span className="title">Project Brief — Intake</span>
            <span className="id">OV—INTAKE</span>
          </div>

          <form ref={formRef} className={`form-body${submitted ? ' hidden' : ''}`} noValidate onSubmit={handleSubmit}>
            <div className="field" data-field="name">
              <label htmlFor="f-name">Full name <span className="req">*</span></label>
              <input type="text" id="f-name" name="name" autoComplete="name" required />
              <div className="field-error">Enter your name.</div>
            </div>
            <div className="field-row">
              <div className="field" data-field="email">
                <label htmlFor="f-email">Work email <span className="req">*</span></label>
                <input type="email" id="f-email" name="email" autoComplete="email" required />
                <div className="field-error">Enter a valid email.</div>
              </div>
              <div className="field" data-field="company">
                <label htmlFor="f-company">Company</label>
                <input type="text" id="f-company" name="company" autoComplete="organization" />
              </div>
            </div>
            <div className="field" data-field="source">
              <label htmlFor="f-source">How did you hear about us</label>
              <select id="f-source" name="source" value={source} onChange={e => setSource(e.target.value)}>
                <option value="">Select an option</option>
                <option>Google / Search</option>
                <option>LinkedIn</option>
                <option>Twitter / X</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>TikTok</option>
                <option>Friend or colleague</option>
                <option>Podcast</option>
                <option>Other</option>
              </select>
              {source === 'Other' && (
                <input type="text" name="sourceOther" placeholder="Tell us where" style={{ marginTop: 10 }} />
              )}
            </div>
            <div className="field" data-field="message">
              <label htmlFor="f-message">Project details <span className="req">*</span></label>
              <textarea id="f-message" name="message" required placeholder="What are you trying to build or fix?"></textarea>
              <div className="field-error">Tell us a bit about the project.</div>
            </div>

            <div className="form-foot">
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit for review'}
              </button>
            </div>
            {error && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 12 }}>{error}</p>}
            <p className="note" style={{ marginTop: 14 }}>By submitting, you agree to be contacted about this project. We don't share your details.</p>
          </form>

          <div className={`success-state${submitted ? ' show' : ''}`} aria-live="polite">
            <div className="check">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4 10-10" /></svg>
            </div>
            <h3>Brief received.</h3>
            <p>Thanks — a member of our engineering team will follow up within one business day at the email you provided.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
