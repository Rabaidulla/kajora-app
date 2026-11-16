import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Banner = {
  title_bn: string
  title_en: string
  subtitle_bn: string
  subtitle_en: string
  image_url: string
  active: boolean
}

const initial: Banner = {
  title_bn: 'আপনার বাড়ি, আমাদের টিম',
  title_en: 'Your Home, Our Team',
  subtitle_bn: '',
  subtitle_en: '',
  image_url: '',
  active: true
}

export function BannerManagement() {
  const [banner, setBanner] = useState<Banner>(initial)
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.from('homepage_banners').select('*')
      .eq('id', 1).maybeSingle()
      .then(({ data, error }) => {
        if (data) setBanner(data)
        if (error) setMessage(error.message)
      })
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Saving...')

    let image_url = banner.image_url

    if (file) {
      const path = `banners/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
      const { error } = await supabase.storage
        .from('kajora-images').upload(path, file)

      if (error) {
        setMessage(error.message)
        return
      }

      image_url = supabase.storage.from('kajora-images')
        .getPublicUrl(path).data.publicUrl
    }

    const { error } = await supabase.from('homepage_banners')
      .upsert({ ...banner, id: 1, image_url })

    if (error) {
      setMessage(error.message)
      return
    }

    setBanner(old => ({ ...old, image_url }))
    setFile(null)
    setMessage('Banner saved successfully!')
  }

  return (
    <section className="admin-banner">
      <h2>Homepage Banner Management</h2>
      <form onSubmit={save}>
        <label>বাংলা শিরোনাম</label>
        <input value={banner.title_bn}
          onChange={e => setBanner({...banner,title_bn:e.target.value})} />

        <label>English Title</label>
        <input value={banner.title_en}
          onChange={e => setBanner({...banner,title_en:e.target.value})} />

        <label>বাংলা বিবরণ</label>
        <textarea value={banner.subtitle_bn}
          onChange={e => setBanner({...banner,subtitle_bn:e.target.value})} />

        <label>English Description</label>
        <textarea value={banner.subtitle_en}
          onChange={e => setBanner({...banner,subtitle_en:e.target.value})} />

        <label>Banner Photo</label>
        <input type="file" accept="image/*"
          onChange={e => setFile(e.target.files?.[0] || null)} />

        <label>
          <input type="checkbox" checked={banner.active}
            onChange={e => setBanner({...banner,active:e.target.checked})} />
          Banner Active
        </label>

        <button type="submit">Save Banner</button>
      </form>

      {banner.image_url && (
        <img src={banner.image_url} alt="Current banner"
          style={{width:'100%',maxHeight:220,objectFit:'cover'}} />
      )}
      <p>{message}</p>
    </section>
  )
}
