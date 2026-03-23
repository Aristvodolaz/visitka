'use client'
import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function Cta() {
  const { t } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Reset form when language changes
  useEffect(() => { setSubmitted(false) }, [t])

  return (
    <section id="cta" ref={ref}>
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-glow" />
          <div>
            <p className="section-label" style={{ marginBottom: '24px' }}>{t.cta.sectionLabel}</p>
            <h2 className="cta-h2">
              {t.cta.h2.split('\n').map((line, i, arr) => (
                <span key={i}>{i === 1 ? <em>{line}</em> : line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="cta-sub" style={{ marginTop: '20px' }}>{t.cta.sub}</p>
            <div className="cta-checks">
              {t.cta.checks.map(check => (
                <div className="cta-check" key={check}>
                  <span className="cta-check-icon">✓</span>
                  {check}
                </div>
              ))}
            </div>
            <div className="cta-direct" style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '14px' }}>
                {t.cta.directLabel}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="tel:+79199031597" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-2)', textDecoration: 'none', fontFamily: 'var(--ff-mono)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +7 919 903-15-97
                </a>
                <a href="mailto:otsnata82@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-2)', textDecoration: 'none', fontFamily: 'var(--ff-mono)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                  </svg>
                  otsnata82@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                <div className="form-row">
                  <input className="form-input" type="text" placeholder={t.cta.form.name} required />
                  <input className="form-input" type="tel" placeholder={t.cta.form.phone} />
                  <input className="form-input" type="email" placeholder={t.cta.form.email} required />
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>{t.cta.form.selectPlaceholder}</option>
                    {t.cta.form.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <textarea className="form-textarea" rows={3} placeholder={t.cta.form.textarea} />
                  <button type="submit" className="btn-submit">{t.cta.form.submit}</button>
                  <p className="form-note">{t.cta.form.note}</p>
                </div>
              </form>
            ) : (
              <div className="form-success">
                <p className="form-success-tag">{t.cta.success.tag}</p>
                <p className="form-success-title">{t.cta.success.title}</p>
                <p className="form-success-sub">{t.cta.success.sub}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
