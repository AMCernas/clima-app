import type { ForecastDay } from '../types/weather'
import WeatherIcon from './WeatherIcon'

interface Props {
  forecast: ForecastDay[]
}

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (d.toDateString() === today.toDateString()) return 'Hoy'
  if (d.toDateString() === tomorrow.toDateString()) return 'Mañana'
  return DAY_NAMES[d.getDay()]
}

export default function Forecast({ forecast }: Props) {
  if (!forecast.length) return null

  return (
    <div className="forecast">
      <h3 className="section-title">Pronóstico {forecast.length} días</h3>
      <div className="forecast-list">
        {forecast.map((day) => (
          <div key={day.date} className="forecast-day">
            <span className="forecast-day-name">{formatDay(day.date)}</span>
            <WeatherIcon type={day.icon_type} size={28} />
            <span className="forecast-condition">{day.condition_text}</span>
            <div className="forecast-temps">
              <span className="forecast-max">{Math.round(day.maxtemp_c)}°</span>
              <span className="forecast-min">{Math.round(day.mintemp_c)}°</span>
            </div>
            {(day.daily_chance_of_rain > 0 || day.daily_chance_of_snow > 0) && (
              <span className="forecast-precip">
                {day.daily_chance_of_rain > day.daily_chance_of_snow
                  ? `🌧 ${day.daily_chance_of_rain}%`
                  : `❄ ${day.daily_chance_of_snow}%`}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
