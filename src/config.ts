const clean = (v?: string) => (v ?? '').replace(/\D/g, '').slice(-10)
export const PHONE = clean(import.meta.env.VITE_PHONE)
export const WHATSAPP = clean(import.meta.env.VITE_WHATSAPP)
export const EMAIL: string = import.meta.env.VITE_EMAIL ?? ''
export const telHref = PHONE ? `tel:+91${PHONE}` : '/contact'
export const waHref = (msg = '') =>
  WHATSAPP ? `https://wa.me/91${WHATSAPP}${msg ? `?text=${encodeURIComponent(msg)}` : ''}` : '/contact'
