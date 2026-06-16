import type { CurrentWeather, Location } from '../types/weather'
import WeatherIcon from './WeatherIcon'

interface Props {
  location: Location
  current: CurrentWeather
}

export default function WeatherCard({ location, current }: Props) {
  return (
    <div className="weather-card">
      <div className="weather-primary">
        <WeatherIcon type={current.icon_type} size={80} />
        <div className="weather-temp-group">
          <span className="weather-temp">{Math.round(current.temp_c)}°</span>
          <span className="weather-condition">{current.condition_text}</span>
        </div>
      </div>
      <div className="weather-location">
        <h2>
          {location.name}
          <span className="weather-country">, {location.country}</span>
        </h2>
        <p className="weather-feels">
          Sensación térmica: {Math.round(current.feelslike_c)}°
        </p>
      </div>
    </div>
  )
}
