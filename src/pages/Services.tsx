import { useLang } from '../i18n'
import ServiceCard from '../components/ServiceCard'
import { useServices } from '../hooks/useServices'

export default function Services() {
  const { t } = useLang()
  const { services, loading, error } = useServices()

  return (
    <section className="section-wrap">
      <h1 className="page-h1">{t('allServices')}</h1>

      {loading && <p>Loading services...</p>}

      {error && <p role="alert">Services could not be loaded.</p>}

      {!loading && !error && (
        <div className="grid">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      )}

      <p className="note">{t('priceNote')}</p>
    </section>
  )
}
