import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'SCRALEX — Масштабирование бизнеса под ключ',
  description: 'Стратегия. Разработка. Аналитика. Один партнёр — полный цикл роста вашего бизнеса.',
  keywords: ['масштабирование бизнеса', 'бизнес-стратегия', 'разработка', 'аналитика', 'рост бизнеса', 'SCRALEX', 'консалтинг'],
  authors: [{ name: 'SCRALEX' }],
  creator: 'SCRALEX',
  publisher: 'SCRALEX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SCRALEX — Масштабирование бизнеса под ключ',
    description: 'Стратегия. Разработка. Аналитика. Один партнёр — полный цикл роста вашего бизнеса.',
    url: 'https://scralex.ru',
    siteName: 'SCRALEX',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCRALEX — Масштабирование бизнеса под ключ',
    description: 'Стратегия. Разработка. Аналитика. Один партнёр — полный цикл роста вашего бизнеса.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  )
}
