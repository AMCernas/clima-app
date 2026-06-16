import { useState, useEffect, useRef } from 'react'
import type { SearchResult } from '../types/weather'
import { searchLocations } from '../services/api'

interface UseSearchResult {
  query: string
  results: SearchResult[]
  loading: boolean
  error: string | null
  setQuery: (q: string) => void
  clear: () => void
}

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setError(null)
      return
    }

    // Debounce 300ms
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await searchLocations(query)
        setResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al buscar')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  const clear = () => {
    setQuery('')
    setResults([])
    setError(null)
  }

  return { query, results, loading, error, setQuery, clear }
}
