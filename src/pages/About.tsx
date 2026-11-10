import { useLang } from '../i18n'
import ContactButtons from '../components/ContactButtons'
export default function About() {
  const { t } = useLang()
  return (
    <section className="section wrap">
      <h1 className="page-h">{t('about')}</h1>
      <p className="lead dark">{t('aboutBody')}</p>
      <ContactButtons />
    </section>
  )
}
