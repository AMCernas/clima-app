import type { NextApiRequest, NextApiResponse } from 'next'

const WEATHER_API_BASE = 'https://api.weatherapi.com/v1'

interface WeatherApiError {
  error?: { code: number; message: string }
}

function mapConditionCode(code: number): string {
  // Mapea códigos de WeatherAPI a nuestros icon types
  if (code === 1000) return 'sunny'
  if (code === 1003) return 'partly-cloudy'
  if (code === 1006) return 'cloudy'
  if (code === 1009) return 'overcast'
  if (code >= 1030 && code <= 1035) return 'mist'
  if (code >= 1135 && code <= 1147) return 'fog'
  if (code === 1063 || code === 1150 || code === 1153) return 'light-rain'
  if (code === 1066 || code === 1210 || code === 1213) return 'light-snow'
  if (code === 1069 || code === 1204 || code === 1249) return 'sleet'
  if (code === 1072 || code === 1168 || code === 1171) return 'freezing-rain'
  if (code === 1087 || code === 1273 || code === 1276) return 'thunder'
  if (code === 1114 || code === 1117) return 'wind'
  if ((code >= 1180 && code <= 1183) || code === 1240) return 'light-rain'
  if ((code >= 1186 && code <= 1192) || code === 1243) return 'moderate-rain'
  if (code === 1195 || code === 1246) return 'heavy-rain'
  if ((code >= 1216 && code <= 1222) || code === 1258) return 'moderate-snow'
  if (code === 1225 || code === 1255) return 'heavy-snow'
  if (code === 1237 || code === 1261 || code === 1264) return 'ice-pellets'
  if (code >= 1279 && code <= 1282) return 'thunder-rain'
  if (code === 1198 || code === 1201) return 'freezing-rain'
  if (code === 1207 || code === 1252) return 'sleet'
  return 'cloudy'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q, days = '7' } = req.query

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" is required' })
  }

  const apiKey = process.env.WEATHER_API_KEY
  if (!apiKey || apiKey === 'tu_api_key_aqui') {
    return res.status(500).json({
      error:
        'WEATHER_API_KEY no configurada. Creá una en https://www.weatherapi.com y ponela en bff/.env.local',
    })
  }

  try {
    const url = `${WEATHER_API_BASE}/forecast.json?key=${apiKey}&q=${encodeURIComponent(q)}&days=${days}&aqi=no&alerts=no`
    const response = await fetch(url)
    const data: Record<string, unknown> & WeatherApiError = await response.json()

    if (!response.ok || data.error) {
      return res.status(response.ok ? 400 : response.status).json({
        error: data.error?.message ?? 'Error al consultar el clima',
      })
    }

    // Transformar a nuestra interfaz limpia
    const result = {
      location: {
        name: (data.location as Record<string, unknown>).name,
        region: (data.location as Record<string, unknown>).region,
        country: (data.location as Record<string, unknown>).country,
        lat: (data.location as Record<string, unknown>).lat,
        lon: (data.location as Record<string, unknown>).lon,
      },
      current: {
        temp_c: (data.current as Record<string, unknown>).temp_c,
        temp_f: (data.current as Record<string, unknown>).temp_f,
        feelslike_c: (data.current as Record<string, unknown>).feelslike_c,
        humidity: (data.current as Record<string, unknown>).humidity,
        wind_kph: (data.current as Record<string, unknown>).wind_kph,
        wind_degree: (data.current as Record<string, unknown>).wind_degree,
        wind_dir: (data.current as Record<string, unknown>).wind_dir,
        pressure_mb: (data.current as Record<string, unknown>).pressure_mb,
        visibility_km: (data.current as Record<string, unknown>).visibility_km,
        uv: (data.current as Record<string, unknown>).uv,
        cloud: (data.current as Record<string, unknown>).cloud,
        condition_text: (data.current as Record<string, unknown>).condition
          ? ((data.current as Record<string, unknown>).condition as Record<string, unknown>).text
          : '',
        condition_code: (data.current as Record<string, unknown>).condition
          ? ((data.current as Record<string, unknown>).condition as Record<string, unknown>).code as number
          : 1006,
        is_day: (data.current as Record<string, unknown>).is_day === 1,
        icon_type: mapConditionCode(
          (data.current as Record<string, unknown>).condition
            ? ((data.current as Record<string, unknown>).condition as Record<string, unknown>).code as number
            : 1006
        ),
      },
      forecast: ((data.forecast as Record<string, unknown>)?.forecastday as Array<Record<string, unknown>>)?.map(
        (day: Record<string, unknown>) => ({
          date: day.date as string,
          maxtemp_c: (day.day as Record<string, unknown>).maxtemp_c as number,
          mintemp_c: (day.day as Record<string, unknown>).mintemp_c as number,
          avgtemp_c: (day.day as Record<string, unknown>).avgtemp_c as number,
          maxwind_kph: (day.day as Record<string, unknown>).maxwind_kph as number,
          totalprecip_mm: (day.day as Record<string, unknown>).totalprecip_mm as number,
          avghumidity: (day.day as Record<string, unknown>).avghumidity as number,
          condition_text: ((day.day as Record<string, unknown>).condition as Record<string, unknown>).text as string,
          condition_code: ((day.day as Record<string, unknown>).condition as Record<string, unknown>).code as number,
          icon_type: mapConditionCode(
            ((day.day as Record<string, unknown>).condition as Record<string, unknown>).code as number
          ),
          sunrise: (day.astro as Record<string, unknown>)?.sunrise as string ?? '',
          sunset: (day.astro as Record<string, unknown>)?.sunset as string ?? '',
          daily_chance_of_rain: (day.day as Record<string, unknown>).daily_chance_of_rain as number ?? 0,
          daily_chance_of_snow: (day.day as Record<string, unknown>).daily_chance_of_snow as number ?? 0,
        })
      ) ?? [],
    }

    res.status(200).json(result)
  } catch (err) {
    console.error('Weather fetch error:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
