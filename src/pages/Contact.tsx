import { useLang } from '../i18n'
import { PHONE, EMAIL, telHref, waHref } from '../config'
export default function Contact() {
  const { t } = useLang()
  return (
    <section className="section wrap">
      <h1 className="page-h">{t('contact')}</h1>
      <p className="lead dark">{t('contactBody')}</p>
      <div className="card contact-card">
        <p><strong>📞</strong> {PHONE ? <a href={telHref}>+91 {PHONE}</a> : t('phoneNotSet')}</p>
        <p><strong>💬</strong> {PHONE ? <a href={waHref()} target="_blank" rel="noopener noreferrer">{t('whatsapp')}</a> : t('phoneNotSet')}</p>
        {EMAIL && <p><strong>✉️ {t('emailLabel')}:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>}
        <p><strong>🕘 {t('hours')}:</strong> {t('hoursNotSet')}</p>
      </div>
    </section>
  )
}
