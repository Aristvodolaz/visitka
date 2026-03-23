'use client'
import { useState, useRef, useEffect } from 'react'

export default function Cta() {
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

  return (
    <section id="cta" ref={ref}>
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-glow" />
          <div>
            <p className="section-label" style={{ marginBottom: '24px' }}>Начать</p>
            <h2 className="cta-h2">
              Готовы к<br /><em>кратному росту?</em>
            </h2>
            <p className="cta-sub" style={{ marginTop: '20px' }}>
              Расскажите о задаче. Первая встреча — бесплатно.
              Без презентаций ни о чём — только предметный разговор о вашем бизнесе.
            </p>
            <div className="cta-checks">
              {['Ответим в течение 4 часов в рабочий день', 'Первый разбор задачи — бесплатно', 'NDA подписываем на старте'].map(check => (
                <div className="cta-check" key={check}>
                  <span className="cta-check-icon">✓</span>
                  {check}
                </div>
              ))}
            </div>

            <div className="cta-direct" style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '14px' }}>
                Или напишите напрямую
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
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
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
                  <input className="form-input" type="text" placeholder="Ваше имя" required />
                  <input className="form-input" type="tel" placeholder="Телефон или Telegram" />
                  <input className="form-input" type="email" placeholder="Email" required />
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>Направление запроса</option>
                    <option>Стратегия и рост бизнеса</option>
                    <option>IT-разработка и автоматизация</option>
                    <option>Бизнес-аналитика и финансы</option>
                    <option>Комплексный проект</option>
                  </select>
                  <textarea className="form-textarea" rows={3} placeholder="Коротко о задаче (необязательно)" />
                  <button type="submit" className="btn-submit">Отправить запрос →</button>
                  <p className="form-note">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </div>
              </form>
            ) : (
              <div className="form-success">
                <p className="form-success-tag">// ЗАПРОС ОТПРАВЛЕН</p>
                <p className="form-success-title">Получили.</p>
                <p className="form-success-sub">Свяжемся в течение 4 часов.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
