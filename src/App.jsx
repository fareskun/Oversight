import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Capabilities from './components/Capabilities'
import Work from './components/Work'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundStars from './components/BackgroundStars'

export default function App() {
  return (
    <>
      <BackgroundStars />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Capabilities />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}