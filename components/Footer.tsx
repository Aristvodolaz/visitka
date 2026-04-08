'use client'
import { useLang } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <a href="#" className="footer-logo">SCALE<span>X</span></a>
            <p className="footer-desc">{t.footer.desc}</p>
          </div>
          <div>
            <p className="footer-col-title">{t.footer.colServices}</p>
            <ul className="footer-links">
              {t.footer.serviceLinks.map(l => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">{t.footer.colCompany}</p>
            <ul className="footer-links">
              {t.footer.companyLinks.map(l => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">{t.footer.colContacts}</p>
            <div className="footer-contact">
              <a href="tel:+79199031597">+7 919 903-15-97</a>
              <a href="mailto:otsnata82@gmail.com">otsnata82@gmail.com</a>
              <span>Russia</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {year} SCRALEX. {t.footer.rights}</p>
          <div className="footer-socials">
            <a href="tel:+79199031597">{t.footer.call}</a>
            <a href="mailto:otsnata82@gmail.com">{t.footer.write}</a>
            <a href="#cta">{t.footer.request}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
