import { useLang } from '../i18n'
import { activeServices } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function Services() {
  const { t } = useLang()
  return (
    <section className="section wrap">
      <h1 className="page-h">{t('allServices')}</h1>
      <div className="grid">{activeServices.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
      <p className="note">{t('priceNote')}</p>
    </section>
  )
}
