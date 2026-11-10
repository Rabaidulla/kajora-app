import type { L } from '../i18n'

export type Service = {
  slug: string
  icon: string
  name: L
  desc: L
  covers: L[]
  active: boolean
}

// Phase 2: this list will come from Supabase. Prices are set by the owner, never invented here.
export const services: Service[] = [
  {
    slug: 'raj-mistri', icon: '🧱', active: true,
    name: { bn: 'রাজমিস্ত্রি', en: 'Raj Mistri' },
    desc: { bn: 'ইট গাঁথুনি, প্লাস্টার, ঢালাই ও বাড়ির সাধারণ নির্মাণ কাজ।', en: 'Brickwork, plaster, casting and general construction work.' },
    covers: [
      { bn: 'ইট গাঁথুনি ও পার্টিশন', en: 'Brickwork and partitions' },
      { bn: 'প্লাস্টার ও ফিনিশিং', en: 'Plaster and finishing' },
      { bn: 'ছোট ঢালাই ও মেরামত', en: 'Small casting and repairs' },
    ],
  },
  {
    slug: 'marble-fitting', icon: '◼️', active: true,
    name: { bn: 'মার্বেল ফিটিং', en: 'Marble Fitting' },
    desc: { bn: 'মেঝে ও দেওয়ালে মার্বেল বসানো, নিখুঁত লেভেল ও জোড়ে।', en: 'Marble laying on floors and walls with precise levels and joints.' },
    covers: [
      { bn: 'মেঝেতে মার্বেল বসানো', en: 'Floor marble laying' },
      { bn: 'সিঁড়ি ও কাউন্টার', en: 'Stairs and counters' },
      { bn: 'জোড় ভরাট ও ফিনিশিং', en: 'Joint filling and finishing' },
    ],
  },
  {
    slug: 'tiles-fitting', icon: '🔲', active: true,
    name: { bn: 'টাইলস ফিটিং', en: 'Tiles Fitting' },
    desc: { bn: 'ঘর, রান্নাঘর ও বাথরুমে টাইলস বসানো।', en: 'Tiles for rooms, kitchens and bathrooms.' },
    covers: [
      { bn: 'মেঝে ও দেওয়ালের টাইলস', en: 'Floor and wall tiles' },
      { bn: 'বাথরুম ও রান্নাঘর', en: 'Bathroom and kitchen' },
      { bn: 'গ্রাউটিং ও ফিনিশিং', en: 'Grouting and finishing' },
    ],
  },
  {
    slug: 'marble-repairing', icon: '🛠️', active: true,
    name: { bn: 'মার্বেল মেরামত', en: 'Marble Repairing' },
    desc: { bn: 'ফাটা, উঠে যাওয়া বা দাগ পড়া মার্বেল মেরামত।', en: 'Repair of cracked, lifted or stained marble.' },
    covers: [
      { bn: 'ফাটল ও চিপ মেরামত', en: 'Crack and chip repair' },
      { bn: 'আলগা মার্বেল পুনরায় বসানো', en: 'Re-fixing loose marble' },
      { bn: 'পলিশ', en: 'Polishing' },
    ],
  },
  {
    slug: 'tiles-repairing', icon: '🔧', active: true,
    name: { bn: 'টাইলস মেরামত', en: 'Tiles Repairing' },
    desc: { bn: 'ভাঙা বা ফাঁপা টাইলস বদলানো ও জোড় ঠিক করা।', en: 'Replacing broken or hollow tiles and fixing joints.' },
    covers: [
      { bn: 'ভাঙা টাইলস বদল', en: 'Broken tile replacement' },
      { bn: 'ফাঁপা টাইলস ঠিক করা', en: 'Fixing hollow tiles' },
      { bn: 'জোড় ও গ্রাউট মেরামত', en: 'Joint and grout repair' },
    ],
  },
  {
    slug: 'marble-tiles-cleaning', icon: '✨', active: true,
    name: { bn: 'মার্বেল ও টাইলস ক্লিনিং', en: 'Marble & Tiles Cleaning' },
    desc: { bn: 'গভীর পরিষ্কার, দাগ তোলা ও ঝকঝকে ফিনিশ।', en: 'Deep cleaning, stain removal and a fresh finish.' },
    covers: [
      { bn: 'গভীর পরিষ্কার', en: 'Deep cleaning' },
      { bn: 'দাগ ও ময়লা তোলা', en: 'Stain and dirt removal' },
      { bn: 'শেষ ফিনিশ', en: 'Final finish' },
    ],
  },
  // Future services: kept disabled until the owner activates them (Phase 3 admin).
  { slug: 'plumbing', icon: '🚿', active: false, name: { bn: 'প্লাম্বিং', en: 'Plumbing' }, desc: { bn: '', en: '' }, covers: [] },
  { slug: 'painting', icon: '🎨', active: false, name: { bn: 'রং করা', en: 'Painting' }, desc: { bn: '', en: '' }, covers: [] },
  { slug: 'electrical', icon: '💡', active: false, name: { bn: 'ইলেকট্রিক', en: 'Electrical Work' }, desc: { bn: '', en: '' }, covers: [] },
  { slug: 'carpentry', icon: '🪚', active: false, name: { bn: 'কাঠের কাজ', en: 'Carpentry' }, desc: { bn: '', en: '' }, covers: [] },
]

export const activeServices = services.filter((s) => s.active)

export const areas: L[] = [
  { bn: 'বারুইপুর', en: 'Baruipur' },
  { bn: 'সোনারপুর', en: 'Sonarpur' },
  { bn: 'জয়নগর', en: 'Jaynagar' },
  { bn: 'আশেপাশের এলাকা', en: 'Nearby areas' },
]
