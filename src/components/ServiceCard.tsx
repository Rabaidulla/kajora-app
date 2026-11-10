import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import type { Service } from '../data/services'

export default function ServiceCard({ s }: { s: Service }) {
  const { pick, t } = useLang()
  return (
    <Link to={`/services/${s.slug}`} className="card service">
      <span className="s-icon" aria-hidden="true">{s.icon}</span>
      <h3>{pick(s.name)}</h3>
      <p>{pick(s.desc)}</p>
      <span className="more">{t('details')}</span>
    </Link>
  )
}
