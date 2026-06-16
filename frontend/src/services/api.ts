import type { WeatherData, SearchResult } from '../types/weather'

const BFF_BASE = '/api'

export async function fetchWeather(
  location: string,
  days: number = 7
): Promise<WeatherData> {
  const res = await fetch(
    `${BFF_BASE}/weather?q=${encodeURIComponent(location)}&days=${days}`
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error de conexión' }))
    throw new Error(err.error || `Error ${res.status}`)
  }
  return res.json()
}

export async function searchLocations(query: string): Promise<SearchResult[]> {
  if (query.trim().length < 2) return []

  const res = await fetch(
    `${BFF_BASE}/search?q=${encodeURIComponent(query)}`
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error de conexión' }))
    throw new Error(err.error || `Error ${res.status}`)
  }
  return res.json()
}
