'use client'
import { useEffect, useRef } from 'react'

const whom = [
  { icon: '◈', title: 'Фаундеры', desc: 'Стартапы и растущие компании, которым нужна стратегия и технологии для кратного роста без раздувания штата.' },
  { icon: '◇', title: 'Собственники', desc: 'Действующий бизнес с выручкой от 30M ₽, который упёрся в потолок и ищет системный выход на следующий уровень.' },
  { icon: '△', title: 'Инвесторы', desc: 'Портфельные компании, которым нужна операционная экспертиза для повышения стоимости актива перед выходом.' },
  { icon: '○', title: 'Топ-менеджеры', desc: 'Руководители, отвечающие за трансформацию или цифровизацию. Ищут надёжного партнёра, а не команду исполнителей.' },
]

export default function ForWhom() {
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
    <section id="forwhom" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Аудитория</p>
        <h2 className="forwhom-h2 reveal" style={{ transitionDelay: '0.1s' }}>
          Работаем с теми,<br />кто думает в масштабе.
        </h2>
        <p className="forwhom-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Нам интересны задачи, где ставки высоки и где нужен партнёр, а не подрядчик.
        </p>
        <div className="whom-grid">
          {whom.map((w, i) => (
            <div className="whom-card reveal" key={w.title} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="whom-icon">{w.icon}</span>
              <h3 className="whom-title">{w.title}</h3>
              <p className="whom-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
