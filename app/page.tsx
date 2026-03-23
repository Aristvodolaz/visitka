import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Roi from '@/components/Roi'
import Cases from '@/components/Cases'
import ForWhom from '@/components/ForWhom'
import Advantages from '@/components/Advantages'
import Cta from '@/components/Cta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Process />
        <Roi />
        <Cases />
        <ForWhom />
        <Advantages />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
