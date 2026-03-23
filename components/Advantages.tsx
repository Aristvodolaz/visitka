'use client'
import { useEffect, useRef } from 'react'

const items = [
  { num: '01', title: 'Полный цикл', desc: 'От стратегии до разработки до аналитики — один партнёр. Не нужно координировать трёх подрядчиков и объяснять контекст каждому заново.' },
  { num: '02', title: 'Один договор', desc: 'Один контрагент, один KPI, одна ответственность. Никакой размытости — результат зафиксирован до старта работ.' },
  { num: '03', title: 'Результат в цифрах', desc: 'Каждое решение обосновано данными. Каждый этап — с измеримыми метриками. Никаких отчётов ради отчётов.' },
  { num: '04', title: 'Полная конфиденциальность', desc: 'NDA на старте. Никакого публичного упоминания без вашего согласия. Внутренняя информация остаётся внутри.' },
  { num: '05', title: 'Команда с опытом', desc: 'За плечами — проекты в e-commerce, SaaS, производстве, ритейле и логистике. Применяем проверенные паттерны.' },
  { num: '06', title: 'Гибкий формат', desc: 'Проектная работа, ретейнер или стратегический партнёр — выбираете формат под задачу. Входной порог — конкретная задача, не бюджет.' },
]

export default function Advantages() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="advantages" className="advantages-section" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Почему мы</p>
        <h2 className="advantages-h2 reveal" style={{ transitionDelay: '0.1s' }}>
          Шесть причин<br />работать с SCALEX
        </h2>
        <div className="adv-grid">
          {items.map((item, i) => (
            <div className="adv-item reveal" key={item.num} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <p className="adv-num">{item.num}</p>
              <h3 className="adv-title">{item.title}</h3>
              <p className="adv-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
