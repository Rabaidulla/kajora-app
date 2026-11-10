import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useLang } from '../i18n'
import { PHONE, EMAIL, telHref, waHref } from '../config'
import Logo from './Logo'

export default function Layout() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])

  const nav = [
    ['/', 'home'], ['/services', 'services'], ['/gallery', 'gallery'], ['/about', 'about'], ['/contact', 'contact'],
  ]
  return (
    <>
      <header className="header">
        <div className="wrap header-in">
          <Link to="/" aria-label="KAJORA"><Logo /></Link>
          <div className="header-actions">
            <button className="lang" onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} aria-label="Change language">
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {open && (
          <nav className="nav wrap">
            {nav.map(([to, k]) => (
              <NavLink key={to} to={to} end={to === '/'}>{t(k)}</NavLink>
            ))}
          </nav>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="wrap">
          <Logo light />
          <p className="foot-tag">{t('tagline')}</p>
          <h4>{t('footerContact')}</h4>
          <p>{PHONE ? <a href={telHref}>+91 {PHONE}</a> : t('phoneNotSet')}</p>
          {EMAIL && <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>}
          <p className="foot-links">
            <Link to="/privacy">{t('privacy')}</Link>
            <Link to="/terms">{t('terms')}</Link>
          </p>
          <p className="copy">© {new Date().getFullYear()} KAJORA</p>
        </div>
      </footer>

      <div className="sticky-bar">
        <a href={telHref} className="sb call" {...(PHONE ? {} : {})}>📞 {t('call')}</a>
        <a href={waHref()} className="sb wa" target={WA_BLANK(waHref())} rel="noopener noreferrer">💬 {t('whatsapp')}</a>
      </div>
    </>
  )
}
function WA_BLANK(h: string) { return h.startsWith('http') ? '_blank' : undefined }
