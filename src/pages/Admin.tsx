import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { BannerManagement } from '../components/BannerManagement'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [owner, setOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<string | null>(null)

  const empty = {
    slug: '',
    name_bn: '',
    name_en: '',
    description_bn: '',
    description_en: '',
    icon_url: '',
    cover_url: '',
    display_order: 0,
    active: true
  }

  const [form, setForm] = useState(empty)

  async function loadOwner() {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user

    if (!user) {
      setOwner(false)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'owner') {
      setOwner(true)
      await loadServices()
    } else {
      setOwner(false)
    }

    setLoading(false)
  }

  async function loadServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order')

    if (error) {
      setMessage(error.message)
      return
    }

    setItems(data || [])
  }

  useEffect(() => {
    loadOwner()
  }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Logging in...')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    await loadOwner()
  }

  async function saveService(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Saving...')

    const payload = {
      ...form,
      display_order: Number(form.display_order)
    }

    const result = editing
      ? await supabase.from('services').update(payload).eq('id', editing)
      : await supabase.from('services').insert(payload)

    if (result.error) {
      setMessage(result.error.message)
      return
    }

    setMessage('Service saved successfully')
    setForm(empty)
    setEditing(null)
    await loadServices()
  }

  function editService(item: any) {
    setEditing(item.id)
    setForm({
      slug: item.slug || '',
      name_bn: item.name_bn || '',
      name_en: item.name_en || '',
      description_bn: item.description_bn || '',
      description_en: item.description_en || '',
      icon_url: item.icon_url || '',
      cover_url: item.cover_url || '',
      display_order: item.display_order || 0,
      active: item.active ?? true
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function toggleService(item: any) {
    const { error } = await supabase
      .from('services')
      .update({ active: !item.active })
      .eq('id', item.id)

    if (error) setMessage(error.message)
    else await loadServices()
  }

  async function logout() {
    await supabase.auth.signOut()
    setOwner(false)
    setItems([])
  }

  if (loading) return <main className="section-wrap">Loading Admin...</main>

  if (!owner) {
    return (
      <main className="section-wrap">
        <h1>Kajora Owner Login</h1>
        <form onSubmit={login} className="admin-form">
          <input
            type="email"
            placeholder="Owner Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </main>
    )
  }

  return (
    <main className="section-wrap">
      <h1>Kajora Admin Panel</h1>
      <button onClick={logout}>Logout</button>

      <h2>{editing ? 'Edit Service' : 'Add New Service'}</h2>

      <form onSubmit={saveService} className="admin-form">
        <input placeholder="Service slug" value={form.slug}
          onChange={e => setForm({...form, slug:e.target.value})} required />

        <input placeholder="বাংলা নাম" value={form.name_bn}
          onChange={e => setForm({...form, name_bn:e.target.value})} required />

        <input placeholder="English name" value={form.name_en}
          onChange={e => setForm({...form, name_en:e.target.value})} required />

        <textarea placeholder="বাংলা বিবরণ" value={form.description_bn}
          onChange={e => setForm({...form, description_bn:e.target.value})} />

        <textarea placeholder="English description" value={form.description_en}
          onChange={e => setForm({...form, description_en:e.target.value})} />

        <input placeholder="Icon image URL" value={form.icon_url}
          onChange={e => setForm({...form, icon_url:e.target.value})} />

        <input placeholder="Cover image URL" value={form.cover_url}
          onChange={e => setForm({...form, cover_url:e.target.value})} />

        <label>Display order</label>
        <input type="number" value={form.display_order}
          onChange={e => setForm({...form, display_order:Number(e.target.value)})} />

        <label>
          <input type="checkbox" checked={form.active}
            onChange={e => setForm({...form, active:e.target.checked})} />
          Service Active
        </label>

        <button type="submit">{editing ? 'Update Service' : 'Add Service'}</button>
        {editing && <button type="button" onClick={() => {
          setEditing(null)
          setForm(empty)
        }}>Cancel Edit</button>}
      </form>

      <p>{message}</p>

      <BannerManagement />
        <h2>All Services ({items.length})</h2>

      {items.map(item => (
        <article key={item.id} className="admin-service">
          <h3>{item.name_bn} / {item.name_en}</h3>
          <p>{item.slug}</p>
          <p>Status: {item.active ? 'Active' : 'Inactive'}</p>
          <button onClick={() => editService(item)}>Edit</button>
          <button onClick={() => toggleService(item)}>
            {item.active ? 'Deactivate' : 'Activate'}
          </button>
        </article>
      ))}
    </main>
  )
}
