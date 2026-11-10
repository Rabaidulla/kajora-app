import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { telHref, waHref } from '../config'

function A({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith('/') ? (
    <Link to={href} className={className}>{children}</Link>
  ) : (
    <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>
  )
}

export default function ContactButtons({ msg = '' }: { msg?: string }) {
  const { t } = useLang()
  return (
    <div className="btn-row">
      <A href="/contact" className="btn btn-primary">{t('book')}</A>
      <A href={telHref} className="btn btn-outline">📞 {t('call')}</A>
      <A href={waHref(msg)} className="btn btn-wa">💬 {t('whatsapp')}</A>
    </div>
  )
}
