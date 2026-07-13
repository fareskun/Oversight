import { useState } from 'react'
import './Footer.css'

const privacyPolicy = `Privacy Policy

Last updated: July 13, 2026

At OVERSIGHT ("we," "us," or "our"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or contact us regarding our software development and digital services.

1. Information We Collect

We may collect information that you voluntarily provide to us, including:

Your name
Email address
Phone number
Company or organization name
Project details and requirements
Any other information you provide through our contact forms, email, or direct communication

We may also automatically collect limited technical information when you visit our website, such as your browser type, device type, IP address, and general website usage data, where applicable.

2. How We Use Your Information

We may use the information we collect to:

Respond to inquiries and project requests
Communicate with you about our services
Prepare proposals and provide requested services
Develop, maintain, and improve our website and services
Protect the security and integrity of our systems
Comply with applicable legal obligations

We do not sell or rent your personal information.

3. Cookies and Analytics

Our website may use cookies or similar technologies to improve functionality, understand how visitors use the website, and improve the user experience.

Where required, you may choose to disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.

4. How We Share Information

We may share information with trusted service providers when necessary to operate our business, host our website, communicate with clients, or deliver our services.

We may also disclose information when required by law or when reasonably necessary to protect our rights, users, systems, or services.

We do not sell personal information to third parties.

5. Data Security

We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.

However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.

6. Data Retention

We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, provide our services, maintain business records, or comply with legal obligations.

7. Third-Party Services

Our website or services may use or link to third-party platforms and services. These third parties operate under their own privacy policies, and we are not responsible for their privacy practices.

8. Your Rights

Depending on applicable law, you may have the right to request access to, correction of, or deletion of your personal information.

To make a privacy-related request, contact us using the details below.

9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated "Last updated" date.

10. Contact Us

If you have questions or concerns about this Privacy Policy or how we handle personal information, contact us at:

OVERSIGHT
Software Development & Digital Solutions
Email: [your business email]
Location: Algeria

Note: This is a general website privacy-policy template, not legal advice. If your website uses specific services such as Google Analytics, Firebase, Meta Pixel, payment processing, or stores user accounts, the policy should be updated to explicitly cover those services and the actual data you collect.`

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false)

  if (showPolicy) {
    return (
      <div className="policy-modal-overlay" onClick={() => setShowPolicy(false)} role="dialog" aria-modal="true" aria-labelledby="policy-title">
        <div className="policy-modal" onClick={e => e.stopPropagation()}>
          <button className="policy-close" onClick={() => setShowPolicy(false)} aria-label="Close privacy policy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="policy-content">
            <h2 id="policy-title" className="policy-title">Privacy Policy</h2>
            {privacyPolicy.split('\n').map((line, i) => (
              <p key={i} className={line.match(/^\d+\./) ? 'policy-heading' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <footer>
      <div className="wrap footer-row">
        <span className="mono">© 2026 OVERSIGHT — All systems monitored.</span>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
          <button className="btn btn-ghost" onClick={() => setShowPolicy(true)}>Privacy Policy</button>
        </div>
      </div>
    </footer>
  )
}