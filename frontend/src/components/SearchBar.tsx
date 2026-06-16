import { useRef, useEffect } from 'react'
import type { SearchResult } from '../types/weather'

interface Props {
  query: string
  results: SearchResult[]
  loading: boolean
  onQueryChange: (q: string) => void
  onSelect: (location: string) => void
  onClear: () => void
}

export default function SearchBar({
  query,
  results,
  loading,
  onQueryChange,
  onSelect,
  onClear,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        onClear()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClear])

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Buscar ubicación..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar ciudad"
          autoComplete="off"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
        />
        {query && (
          <button className="search-clear" onClick={onClear} aria-label="Limpiar búsqueda">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {loading && <div className="search-status">Buscando...</div>}

      {results.length > 0 && (
        <ul ref={listRef} id="search-results" className="search-results" role="listbox">
          {results.map((r) => (
            <li
              key={r.id}
              role="option"
              aria-selected={false}
              className="search-result-item"
              onClick={() => onSelect(`${r.name}, ${r.country}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelect(`${r.name}, ${r.country}`)
              }}
              tabIndex={0}
            >
              <span className="result-name">{r.name}</span>
              <span className="result-region">{r.region ? `${r.region}, ` : ''}{r.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
