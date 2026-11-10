import { useLang } from '../i18n'
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useLang()
  return (
    <section className="section wrap">
      <h1 className="page-h">{t(kind)}</h1>
      <p className="lead dark">{t(kind === 'privacy' ? 'privacyBody' : 'termsBody')}</p>
    </section>
  )
}
