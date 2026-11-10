import { useLang } from '../i18n'
export default function Gallery() {
  const { t } = useLang()
  return (
    <section className="section wrap">
      <h1 className="page-h">{t('gallery')}</h1>
      <div className="empty">{t('galleryEmpty')}</div>
    </section>
  )
}
