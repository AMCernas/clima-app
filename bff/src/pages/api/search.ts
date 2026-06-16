import type { NextApiRequest, NextApiResponse } from 'next'

const WEATHER_API_BASE = 'https://api.weatherapi.com/v1'

interface SearchResponseItem {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

interface WeatherApiError {
  error?: { code: number; message: string }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q } = req.query

  if (!q || typeof q !== 'string' || q.trim().length < 2) {
    return res.status(400).json({ error: '"q" debe tener al menos 2 caracteres' })
  }

  const apiKey = process.env.WEATHER_API_KEY
  if (!apiKey || apiKey === 'tu_api_key_aqui') {
    return res.status(500).json({
      error:
        'WEATHER_API_KEY no configurada. Creá una en https://www.weatherapi.com y ponela en bff/.env.local',
    })
  }

  try {
    const url = `${WEATHER_API_BASE}/search.json?key=${apiKey}&q=${encodeURIComponent(q)}`
    const response = await fetch(url)
    const data: SearchResponseItem[] | WeatherApiError = await response.json()

    if (!response.ok || Array.isArray(data) === false) {
      const errData = data as WeatherApiError
      return res.status(response.ok ? 400 : response.status).json({
        error: errData.error?.message ?? 'Error al buscar ubicación',
      })
    }

    const results = (data as SearchResponseItem[]).map((item) => ({
      id: item.id,
      name: item.name,
      region: item.region,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
      url: item.url,
    }))

    res.status(200).json(results)
  } catch (err) {
    console.error('Search error:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
