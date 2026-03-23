'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { translations, Lang, T } from '@/lib/translations'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: T; transitioning: boolean }

const LanguageContext = createContext<Ctx>({
  lang: 'ru',
  setLang: () => {},
  t: translations.ru,
  transitioning: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang
    if (saved === 'ru' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return
    setTransitioning(true)
    setTimeout(() => {
      setLangState(l)
      localStorage.setItem('lang', l)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(false))
      })
    }, 200)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], transitioning }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
