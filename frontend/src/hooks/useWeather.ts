import { useState, useEffect, useCallback } from 'react'
import type { WeatherData } from '../types/weather'
import { fetchWeather } from '../services/api'

interface UseWeatherResult {
  data: WeatherData | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useWeather(location: string | null): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!location) {
      setData(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchWeather(location)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el clima')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [location])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refresh: load }
}
