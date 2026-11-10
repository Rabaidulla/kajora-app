export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="logo" aria-label="KAJORA">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={light ? '#F28C28' : '#0B1F3A'} />
        <path d="M12 32 32 14l20 18v18H12z" fill="none" stroke={light ? '#0B1F3A' : '#F28C28'} strokeWidth="4" strokeLinejoin="round" />
        <path d="M24 50V30h6v20M34 50V38h6v12" stroke={light ? '#0B1F3A' : '#fff'} strokeWidth="3" fill="none" />
      </svg>
      <span className="logo-text">KAJORA</span>
    </span>
  )
}
