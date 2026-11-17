import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n'

type Banner = {
  title_bn: string
  title_en: string
  subtitle_bn: string
  subtitle_en: string
  image_url: string
  active: boolean
}

export default function HomepageBanner() {
  const [banner, setBanner] = useState<Banner | null>(null)
  const { lang } = useLang()

  useEffect(() => {
    async function loadBanner() {
      const { data, error } = await supabase
        .from('homepage_banners')
        .select('*')
        .eq('id', 1)
        .eq('active', true)
        .maybeSingle()

      if (error) {
        console.error('Banner error:', error.message)
        return
      }

      setBanner(data as Banner | null)
    }

    loadBanner()
  }, [])

  if (!banner) return null

  return (
    <section className="section wrap" style={{ paddingTop: 16 }}>
      {banner.image_url && (
        <img
          src={banner.image_url}
          alt="Kajora Home Services"
          style={{
            width: '100%',
            maxHeight: 380,
            objectFit: 'cover',
            borderRadius: 16,
            display: 'block'
          }}
        />
      )}

      <div style={{ textAlign: 'center', padding: '12px 8px' }}>
        <h2>{lang === 'en' ? banner.title_en : banner.title_bn}</h2>
        <p>{lang === 'en' ? banner.subtitle_en : banner.subtitle_bn}</p>
      </div>
    </section>
  )
}
