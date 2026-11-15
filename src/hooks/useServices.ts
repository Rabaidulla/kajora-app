import { useEffect, useState } from 'react'
import { fetchKajoraServices, type Service } from '../data/services'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadServices() {
      try {
        setLoading(true)
        const data = await fetchKajoraServices()

        if (mounted) {
          setServices(data.filter(service => service.active))
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Services could not load')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadServices()

    return () => {
      mounted = false
    }
  }, [])

  return { services, loading, error }
}
