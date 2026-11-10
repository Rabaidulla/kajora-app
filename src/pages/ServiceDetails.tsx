import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n'
import { services } from '../data/services'
import ContactButtons from '../components/ContactButtons'

export default function ServiceDetails() {
  const { slug } = useParams()
  const { t, pick } = useLang()
  const s = services.find((x) => x.slug === slug && x.active)
  if (!s) return (
    <section className="section wrap"><h1 className="page-h">{t('notFound')}</h1><Link to="/services" className="more">{t('allServices')}</Link></section>
  )
  return (
    <section className="section wrap">
      <Link to="/services" className="more">← {t('back')}</Link>
      <div className="detail-icon" aria-hidden="true">{s.icon}</div>
      <h1 className="page-h">{pick(s.name)}</h1>
      <p className="lead dark">{pick(s.desc)}</p>
      <h3>{t('includes')}</h3>
      <ul className="ticks">{s.covers.map((c) => <li key={c.en}>{pick(c)}</li>)}</ul>
      <p className="note">{t('priceNote')}</p>
      <ContactButtons msg={`${s.name.en} - KAJORA`} />
    </section>
  )
}
