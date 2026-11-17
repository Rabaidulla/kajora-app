import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { areas } from '../data/services'
import { useServices } from '../hooks/useServices'
import ServiceCard from '../components/ServiceCard'
import ContactButtons from '../components/ContactButtons'
import HomepageBanner from '../components/HomepageBanner'

export default function Home() {
  const { services: activeServices } = useServices()
  const { t, pick } = useLang()
  const why = [['why1t', 'why1d'], ['why2t', 'why2d'], ['why3t', 'why3d']]
  return (
    <>
        <HomepageBanner />
      <section className="hero">
        <div className="wrap hero-in">
          <h1>{t('tagline')}</h1>
          <p className="lead">{t('heroIntro')}</p>
          <ContactButtons />
        </div>
      </section>

      <section className="section wrap">
        <h2>{t('popular')}</h2>
        <div className="grid">
          {activeServices.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
        <p className="note">{t('priceNote')}</p>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>{t('whyTitle')}</h2>
          <div className="why">
            {why.map(([a, b]) => (
              <div key={a} className="why-item"><h3>{t(a)}</h3><p>{t(b)}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2>{t('howTitle')}</h2>
        <ol className="steps">
          {['how1', 'how2', 'how3', 'how4'].map((k) => <li key={k}>{t(k)}</li>)}
        </ol>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>{t('gallery')}</h2>
          <div className="empty">{t('galleryEmpty')}</div>
          <Link to="/gallery" className="more">{t('gallery')}</Link>
        </div>
      </section>

      <section className="section wrap">
        <h2>{t('reviews')}</h2>
        <div className="empty">{t('reviewsEmpty')}</div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>{t('areas')}</h2>
          <div className="chips">
            {areas.map((a) => <span key={a.en} className="chip">{pick(a)}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
