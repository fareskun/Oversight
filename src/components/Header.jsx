import { useState } from 'react'
import './Header.css'
import logoSvg from '../assets/logo.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header>
      <div className="nav">
        <div className="logo">
          <img src={logoSvg} alt="Oversight" className="logo-img" />
        </div>
        <nav className="nav-links" aria-label="Primary">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary">Start a project</a>
          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobilePanel"
            onClick={() => setOpen(o => !o)}
          >
            <span></span>
          </button>
        </div>
      </div>
      <div className={`mobile-panel${open ? ' open' : ''}`} id="mobilePanel">
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </header>
  )
}
