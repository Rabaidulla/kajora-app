import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Logo from './components/Logo'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import { useLang } from './i18n'

export default function App() {
  const [splash, setSplash] = useState(true)
  const { t } = useLang()
  useEffect(() => { const id = setTimeout(() => setSplash(false), 900); return () => clearTimeout(id) }, [])
  if (splash) return (
    <div className="splash"><Logo light /><p>{t('tagline')}</p></div>
  )
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<section className="section wrap"><h1 className="page-h">{t('notFound')}</h1></section>} />
      </Route>
    </Routes>
  )
}
