import type { CurrentWeather } from '../types/weather'

interface Props {
  current: CurrentWeather
}

interface DetailItem {
  label: string
  value: string
  icon: string
}

// Iconos inline minimalistas para cada detalle
const icons: Record<string, string> = {
  humedad:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  viento:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>',
  uv: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m-10-10h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>',
  presion:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  visibilidad:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  nubes:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
}

export default function WeatherDetails({ current }: Props) {
  const details: DetailItem[] = [
    { label: 'Humedad', value: `${current.humidity}%`, icon: icons.humedad },
    { label: 'Viento', value: `${current.wind_kph} km/h ${current.wind_dir}`, icon: icons.viento },
    { label: 'Índice UV', value: `${current.uv}`, icon: icons.uv },
    { label: 'Presión', value: `${current.pressure_mb} hPa`, icon: icons.presion },
    { label: 'Visibilidad', value: `${current.visibility_km} km`, icon: icons.visibilidad },
    { label: 'Nubes', value: `${current.cloud}%`, icon: icons.nubes },
  ]

  return (
    <div className="weather-details">
      <h3 className="section-title">Detalles</h3>
      <div className="details-grid">
        {details.map((d) => (
          <div key={d.label} className="detail-item">
            <span
              className="detail-icon"
              dangerouslySetInnerHTML={{ __html: d.icon }}
            />
            <span className="detail-value">{d.value}</span>
            <span className="detail-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
