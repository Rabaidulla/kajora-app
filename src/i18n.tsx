import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'bn' | 'en'
export type L = { bn: string; en: string }

const dict: Record<string, L> = {
  tagline: { bn: 'আপনার বাড়ি। আমাদের টিম।', en: 'Your Home. Our Team.' },
  heroIntro: {
    bn: 'রাজমিস্ত্রি, মার্বেল ও টাইলসের কাজ — বারুইপুর, সোনারপুর, জয়নগর ও আশেপাশে। মালিক নিজে কাজ দেখেন।',
    en: 'Raj Mistri, marble and tiles work in Baruipur, Sonarpur, Jaynagar and nearby. The owner oversees every job.',
  },
  home: { bn: 'হোম', en: 'Home' },
  services: { bn: 'সার্ভিস', en: 'Services' },
  gallery: { bn: 'কাজের গ্যালারি', en: 'Work Gallery' },
  about: { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
  contact: { bn: 'যোগাযোগ', en: 'Contact' },
  privacy: { bn: 'প্রাইভেসি পলিসি', en: 'Privacy Policy' },
  terms: { bn: 'শর্তাবলি', en: 'Terms and Conditions' },
  book: { bn: 'সার্ভিস বুক করুন', en: 'Book a Service' },
  call: { bn: 'এখনই কল করুন', en: 'Call Now' },
  whatsapp: { bn: 'হোয়াটসঅ্যাপ', en: 'WhatsApp' },
  popular: { bn: 'জনপ্রিয় সার্ভিস', en: 'Popular Services' },
  allServices: { bn: 'সব সার্ভিস', en: 'All Services' },
  details: { bn: 'বিস্তারিত দেখুন', en: 'View details' },
  priceNote: { bn: 'দাম কাজের মাপ ও ধরন দেখে ঠিক হয়। মালিকের সাথে কথা বলুন।', en: 'Price depends on the size and type of work. Talk to the owner.' },
  whyTitle: { bn: 'কেন KAJORA?', en: 'Why KAJORA?' },
  why1t: { bn: 'একজন মালিক, সরাসরি কথা', en: 'One owner, direct talk' },
  why1d: { bn: 'মধ্যস্বত্বভোগী নেই। সরাসরি মালিকের সাথে কথা বলুন।', en: 'No middlemen. You speak to the owner directly.' },
  why2t: { bn: 'নিজস্ব দক্ষ কারিগর', en: 'Our own skilled workers' },
  why2d: { bn: 'মালিকের নিজের মিস্ত্রি ও হেল্পার আপনার বাড়িতে যাবে।', en: "The owner's own masons and helpers visit your home." },
  why3t: { bn: 'আগে দেখে, তারপর দাম', en: 'See first, then price' },
  why3d: { bn: 'সাইট ভিজিটের পর কাজের খরচ জানানো হয়।', en: 'Cost is shared after a site visit.' },
  howTitle: { bn: 'কীভাবে কাজ হয়', en: 'How it works' },
  how1: { bn: 'কল বা হোয়াটসঅ্যাপে জানান', en: 'Call or WhatsApp us' },
  how2: { bn: 'সাইট ভিজিট ও খরচ ঠিক', en: 'Site visit and estimate' },
  how3: { bn: 'কারিগর পাঠানো ও কাজ শুরু', en: 'Workers sent, work starts' },
  how4: { bn: 'কাজ শেষ, আপনার সন্তুষ্টি', en: 'Work done, you approve' },
  galleryEmpty: { bn: 'আসল কাজের ছবি শীঘ্রই আসছে।', en: 'Real work photos are coming soon.' },
  reviews: { bn: 'গ্রাহকদের মতামত', en: 'Customer reviews' },
  reviewsEmpty: { bn: 'প্রথম গ্রাহকের মতামত শীঘ্রই এখানে দেখানো হবে।', en: 'The first customer reviews will appear here soon.' },
  sample: { bn: 'নমুনা বিষয়বস্তু', en: 'Sample content' },
  areas: { bn: 'আমাদের সার্ভিস এরিয়া', en: 'Our service area' },
  footerContact: { bn: 'যোগাযোগ', en: 'Contact' },
  phoneNotSet: { bn: 'ফোন নম্বর শীঘ্রই যোগ হবে', en: 'Phone number will be added soon' },
  back: { bn: 'ফিরে যান', en: 'Back' },
  notFound: { bn: 'পেজটি পাওয়া যায়নি', en: 'Page not found' },
  loading: { bn: 'লোড হচ্ছে…', en: 'Loading…' },
  includes: { bn: 'এই সার্ভিসে যা থাকে', en: 'What this service covers' },
  aboutBody: {
    bn: 'KAJORA একজন মালিকের পরিচালিত হোম রেনোভেশন ও হোম সার্ভিস ব্যবসা। আমরা দক্ষিণ ২৪ পরগনায় রাজমিস্ত্রি, মার্বেল ও টাইলসের কাজ করি। এটি কোনো মার্কেটপ্লেস নয়। আপনি সরাসরি মালিকের সাথে কথা বলবেন এবং মালিকের নিজের কারিগররাই কাজ করবেন।',
    en: 'KAJORA is a single-owner home renovation and home services business. We do Raj Mistri, marble and tiles work across South 24 Parganas. This is not a marketplace. You speak directly to the owner and the owner\'s own workers do the job.',
  },
  contactBody: { bn: 'কাজের কথা বলতে কল বা হোয়াটসঅ্যাপ করুন।', en: 'Call or WhatsApp to discuss your work.' },
  hours: { bn: 'সময়', en: 'Hours' },
  hoursNotSet: { bn: 'কাজের সময় শীঘ্রই জানানো হবে', en: 'Business hours will be announced soon' },
  emailLabel: { bn: 'ইমেইল', en: 'Email' },
  privacyBody: {
    bn: 'আমরা শুধু কাজের জন্য প্রয়োজনীয় তথ্য (নাম, মোবাইল নম্বর, ঠিকানা, কাজের বিবরণ) সংগ্রহ করব। এই তথ্য কখনো প্রকাশ্যে দেখানো বা বিক্রি করা হবে না। কারিগরদের ব্যক্তিগত তথ্যও গোপন থাকবে। তথ্য মুছতে চাইলে মালিকের সাথে যোগাযোগ করুন। (খসড়া — চালুর আগে মালিক চূড়ান্ত করবেন)',
    en: 'We collect only the information needed for the job (name, mobile number, address, work details). It is never shown publicly or sold. Workers\' private details also stay private. To delete your data, contact the owner. (Draft: the owner will finalise before launch.)',
  },
  termsBody: {
    bn: 'বুকিং করলে মালিক আপনার সাথে যোগাযোগ করে সাইট ভিজিট ও খরচ নিশ্চিত করবেন। চূড়ান্ত দাম কাজের ধরন ও মাপের ওপর নির্ভর করে। কাজ শুরুর আগে শর্ত ও পেমেন্ট আলোচনা করে নেওয়া হবে। (খসড়া — চালুর আগে মালিক চূড়ান্ত করবেন)',
    en: 'After you book, the owner will contact you to confirm a site visit and cost. Final price depends on the type and size of work. Terms and payment are agreed before work starts. (Draft: the owner will finalise before launch.)',
  },
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; pick: (v: L) => string }
const LangCtx = createContext<Ctx>(null!)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem('kajora-lang') === 'en' ? 'en' : 'bn'
    } catch {
      return 'bn'
    }
  })
  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('kajora-lang', l)
    } catch {
      /* ignore */
    }
  }
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const t = (k: string) => dict[k]?.[lang] ?? k
  const pick = (v: L) => v[lang]
  return <LangCtx.Provider value={{ lang, setLang, t, pick }}>{children}</LangCtx.Provider>
}
export const useLang = () => useContext(LangCtx)
