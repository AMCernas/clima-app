import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/ForecastCard'
import { useWeather } from './hooks/useWeather'
import { useSearch } from './hooks/useSearch'

// Intentar obtener ubicación del usuario
function getInitialLocation(): string | null {
  const saved = localStorage.getItem('clima-location')
  if (saved) return saved
  return null
}

export default function App() {
  const [location, setLocation] = useState<string | null>(getInitialLocation)
  const { data, loading, error, refresh } = useWeather(location)
  const search = useSearch()

  // Geo-detection al primer render si no hay ubicación guardada
  useEffect(() => {
    if (location) return

    // Intentar geolocalización una sola vez
    let cancelled = false
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (cancelled) return
          const loc = `${pos.coords.latitude},${pos.coords.longitude}`
          setLocation(loc)
          localStorage.setItem('clima-location', loc)
        },
        () => {
          // Si rechaza o falla, mostrar Buenos Aires por defecto
          if (!cancelled) {
            const fallback = 'Buenos Aires, Argentina'
            setLocation(fallback)
            localStorage.setItem('clima-location', fallback)
          }
        },
        { timeout: 5000, enableHighAccuracy: false }
      )
    } else {
      const fallback = 'Buenos Aires, Argentina'
      setLocation(fallback)
      localStorage.setItem('clima-location', fallback)
    }

    return () => { cancelled = true }
  }, [location])

  const handleSelectLocation = useCallback((loc: string) => {
    setLocation(loc)
    localStorage.setItem('clima-location', loc)
    search.clear()
  }, [search])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Clima</h1>
        <SearchBar
          query={search.query}
          results={search.results}
          loading={search.loading}
          onQueryChange={search.setQuery}
          onSelect={handleSelectLocation}
          onClear={search.clear}
        />
      </header>

      <main className="main">
        {loading && (
          <div className="state-msg">
            <div className="spinner" />
            <p>Cargando...</p>
          </div>
        )}

        {error && (
          <div className="state-msg error">
            <p>{error}</p>
            {location && (
              <button className="retry-btn" onClick={refresh}>
                Reintentar
              </button>
            )}
          </div>
        )}

        {!loading && !error && !data && (
          <div className="state-msg">
            <p>Buscá una ciudad para ver el clima.</p>
          </div>
        )}

        {data && (
          <>
            <WeatherCard location={data.location} current={data.current} />
            <WeatherDetails current={data.current} />
            <Forecast forecast={data.forecast} />
          </>
        )}
      </main>

      <footer className="footer">
        <p>Datos: <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI</a></p>
      </footer>
    </div>
  )
}
