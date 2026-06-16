// --- Condiciones de WeatherAPI mapeadas a iconos custom ---
export type WeatherCondition =
  | 'sunny'
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'mist'
  | 'fog'
  | 'light-rain'
  | 'moderate-rain'
  | 'heavy-rain'
  | 'light-snow'
  | 'moderate-snow'
  | 'heavy-snow'
  | 'sleet'
  | 'freezing-rain'
  | 'thunder'
  | 'thunder-rain'
  | 'ice-pellets'
  | 'wind'

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
}

export interface CurrentWeather {
  temp_c: number
  temp_f: number
  feelslike_c: number
  humidity: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  visibility_km: number
  uv: number
  cloud: number
  condition_text: string
  condition_code: number
  is_day: boolean
  icon_type: WeatherCondition
}

export interface ForecastDay {
  date: string
  maxtemp_c: number
  mintemp_c: number
  avgtemp_c: number
  maxwind_kph: number
  totalprecip_mm: number
  avghumidity: number
  condition_text: string
  condition_code: number
  icon_type: WeatherCondition
  sunrise: string
  sunset: string
  daily_chance_of_rain: number
  daily_chance_of_snow: number
}

export interface WeatherData {
  location: Location
  current: CurrentWeather
  forecast: ForecastDay[]
}

export interface SearchResult {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}
