'use client'
import { useEffect } from 'react'
import { LanguageProvider, useLang } from '@/context/LanguageContext'

function LangEffects({ children }: { children: React.ReactNode }) {
  const { lang, transitioning } = useLang()

  // Keep html[lang] in sync for CSS :lang() selectors & accessibility
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className={`lang-root${transitioning ? ' lang-fading' : ''}`}>
      {children}
    </div>
  )
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LangEffects>{children}</LangEffects>
    </LanguageProvider>
  )
}
