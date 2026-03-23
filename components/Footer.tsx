export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <a href="#" className="footer-logo">SCALE<span>X</span></a>
            <p className="footer-desc">
              Масштабирование бизнеса под ключ. Стратегия, разработка и аналитика — один партнёр, полный цикл роста.
            </p>
          </div>

          <div>
            <p className="footer-col-title">Услуги</p>
            <ul className="footer-links">
              <li><a href="#services">Стратегия и партнёрства</a></li>
              <li><a href="#services">IT-разработка</a></li>
              <li><a href="#services">Бизнес-аналитика</a></li>
              <li><a href="#process">Как мы работаем</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Компания</p>
            <ul className="footer-links">
              <li><a href="#philosophy">О нас</a></li>
              <li><a href="#cases">Кейсы</a></li>
              <li><a href="#forwhom">Для кого</a></li>
              <li><a href="#roi">Результаты</a></li>
              <li><a href="#cta">Связаться</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Контакты</p>
            <div className="footer-contact">
              <a href="tel:+79199031597">+7 919 903-15-97</a>
              <a href="mailto:otsnata82@gmail.com">otsnata82@gmail.com</a>
              <span>Россия</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} SCALEX. Все права защищены.</p>
          <div className="footer-socials">
            <a href="tel:+79199031597">Позвонить</a>
            <a href="mailto:otsnata82@gmail.com">Написать</a>
            <a href="#cta">Заявка</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
