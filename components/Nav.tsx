'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'

const NAV_SECTIONS = ['services', 'cases', 'process', 'cta']

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [topbarHidden, setTopbarHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > 80 && y > lastY) setTopbarHidden(true)
      else if (y < lastY) setTopbarHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const observers: IntersectionObserver[] = []
    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <div className={`nav-topbar ${topbarHidden ? 'hide' : ''}`}>
        <div className="container">
          <div className="nav-topbar-inner">
            <span className="nav-topbar-tag">SCALEX</span>
            <div className="nav-topbar-links">
              <a href="mailto:otsnata82@gmail.com" className="nav-topbar-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                </svg>
                otsnata82@gmail.com
              </a>
              <div className="nav-topbar-sep" />
              <a href="tel:+79199031597" className="nav-topbar-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +7 919 903-15-97
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${topbarHidden ? 'topbar-hidden' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              <span className="nav-logo-mark">S</span>
              SCALE<span>X</span>
            </a>

            <ul className="nav-links">
              <li><a href="#services" className={active === 'services' ? 'active' : ''}>{t.nav.services}</a></li>
              <li><a href="#cases" className={active === 'cases' ? 'active' : ''}>{t.nav.cases}</a></li>
              <li><a href="#process" className={active === 'process' ? 'active' : ''}>{t.nav.process}</a></li>
              <li><a href="#cta" className={active === 'cta' ? 'active' : ''}>{t.nav.contact}</a></li>
            </ul>

            <div className="nav-right">
              <div className="lang-switcher nav-cta-desktop" role="group" aria-label="Language">
                <div className={`lang-slide${lang === 'en' ? ' lang-slide--en' : ''}`} aria-hidden="true" />
                <button className={`lang-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>RU</button>
                <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
              </div>
              <a href="tel:+79199031597" className="nav-phone nav-cta-desktop">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +7 919 903-15-97
              </a>
              <a href="#cta" className="btn btn-outline nav-cta-desktop" style={{ padding: '10px 20px', fontSize: '13px' }}>
                {t.nav.cta}
              </a>
              <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <a href="#services" onClick={close}>{t.nav.services}</a>
        <a href="#cases" onClick={close}>{t.nav.cases}</a>
        <a href="#process" onClick={close}>{t.nav.process}</a>
        <a href="#cta" onClick={close}>{t.nav.cta}</a>
        <div className="mobile-menu-contacts">
          <a href="tel:+79199031597" onClick={close}>+7 919 903-15-97</a>
          <a href="mailto:otsnata82@gmail.com" onClick={close}>otsnata82@gmail.com</a>
          <div className="lang-switcher" style={{ marginTop: '8px', width: 'fit-content' }}>
            <div className={`lang-slide${lang === 'en' ? ' lang-slide--en' : ''}`} aria-hidden="true" />
            <button className={`lang-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => { setLang('ru'); close() }}>RU</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => { setLang('en'); close() }}>EN</button>
          </div>
        </div>
      </div>
    </>
  )
}
