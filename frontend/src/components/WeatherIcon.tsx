import type { WeatherCondition } from '../types/weather'

interface Props {
  type: WeatherCondition
  size?: number
  className?: string
}

/** SVG minimalistas en blanco y negro — puro stroke, sin fill */
export default function WeatherIcon({ type, size = 48, className = '' }: Props) {
  const s = size
  const lw = Math.max(1.5, s / 28)

  const svgProps = {
    width: s,
    height: s,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: lw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (type) {
    case 'sunny':
    case 'clear':
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="10" />
          <line x1="32" y1="6" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="58" />
          <line x1="6" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="58" y2="32" />
          <line x1="12.7" y1="12.7" x2="16.7" y2="16.7" />
          <line x1="47.3" y1="47.3" x2="51.3" y2="51.3" />
          <line x1="12.7" y1="51.3" x2="16.7" y2="47.3" />
          <line x1="47.3" y1="16.7" x2="51.3" y2="12.7" />
        </svg>
      )

    case 'partly-cloudy':
      return (
        <svg {...svgProps}>
          <circle cx="28" cy="26" r="9" />
          <line x1="28" y1="11" x2="28" y2="14" />
          <line x1="28" y1="38" x2="28" y2="40" />
          <line x1="13" y1="26" x2="16" y2="26" />
          <line x1="40" y1="26" x2="42" y2="26" />
          <line x1="17.5" y1="15.5" x2="19.5" y2="17.5" />
          <line x1="36.5" y1="34.5" x2="38.5" y2="36.5" />
          <path d="M30 44h20a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4" />
          <path d="M30 44H18a5 5 0 0 1 0-10h2a7 7 0 0 1 10-4" />
        </svg>
      )

    case 'cloudy':
      return (
        <svg {...svgProps}>
          <path d="M20 44h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
        </svg>
      )

    case 'overcast':
      return (
        <svg {...svgProps}>
          <path d="M16 42h30a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-3 6 6 0 0 0-11-1 6 6 0 0 0-8 4h-1a5 5 0 0 0 0 10h2z" />
          <path d="M32 42h14a4 4 0 0 0 0-8h-1a6 6 0 0 0-10-2" />
        </svg>
      )

    case 'mist':
    case 'fog':
      return (
        <svg {...svgProps}>
          <line x1="16" y1="24" x2="48" y2="24" />
          <line x1="12" y1="32" x2="52" y2="32" />
          <line x1="14" y1="40" x2="50" y2="40" />
          <line x1="18" y1="48" x2="46" y2="48" />
        </svg>
      )

    case 'wind':
      return (
        <svg {...svgProps}>
          <path d="M12 28h22a4 4 0 1 0-4-4" />
          <path d="M16 36h28a5 5 0 1 0-5-5" />
          <line x1="20" y1="44" x2="40" y2="44" />
        </svg>
      )

    case 'light-rain':
      return (
        <svg {...svgProps}>
          <path d="M18 36h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <line x1="24" y1="44" x2="22" y2="50" />
          <line x1="32" y1="44" x2="30" y2="50" />
          <line x1="40" y1="44" x2="38" y2="50" />
        </svg>
      )

    case 'moderate-rain':
      return (
        <svg {...svgProps}>
          <path d="M18 34h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <line x1="20" y1="42" x2="17" y2="50" />
          <line x1="28" y1="42" x2="25" y2="50" />
          <line x1="36" y1="42" x2="33" y2="50" />
          <line x1="44" y1="42" x2="41" y2="50" />
        </svg>
      )

    case 'heavy-rain':
      return (
        <svg {...svgProps}>
          <path d="M18 32h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-3 6 6 0 0 0-11-1 6 6 0 0 0-8 4h-1a5 5 0 0 0 0 10h2z" />
          <line x1="18" y1="40" x2="13" y2="52" />
          <line x1="26" y1="40" x2="21" y2="52" />
          <line x1="34" y1="40" x2="29" y2="52" />
          <line x1="42" y1="40" x2="37" y2="52" />
          <line x1="50" y1="40" x2="45" y2="52" />
        </svg>
      )

    case 'light-snow':
      return (
        <svg {...svgProps}>
          <path d="M18 36h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <circle cx="24" cy="46" r="1.5" />
          <circle cx="32" cy="46" r="1.5" />
          <circle cx="40" cy="46" r="1.5" />
        </svg>
      )

    case 'moderate-snow':
      return (
        <svg {...svgProps}>
          <path d="M18 34h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <circle cx="20" cy="44" r="1.5" />
          <circle cx="28" cy="44" r="1.5" />
          <circle cx="36" cy="44" r="1.5" />
          <circle cx="44" cy="44" r="1.5" />
          <circle cx="24" cy="50" r="1.5" />
          <circle cx="32" cy="50" r="1.5" />
          <circle cx="40" cy="50" r="1.5" />
        </svg>
      )

    case 'heavy-snow':
      return (
        <svg {...svgProps}>
          <path d="M18 32h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-3 6 6 0 0 0-11-1 6 6 0 0 0-8 4h-1a5 5 0 0 0 0 10h2z" />
          <circle cx="18" cy="42" r="1.5" />
          <circle cx="26" cy="42" r="1.5" />
          <circle cx="34" cy="42" r="1.5" />
          <circle cx="42" cy="42" r="1.5" />
          <circle cx="50" cy="42" r="1.5" />
          <circle cx="22" cy="50" r="1.5" />
          <circle cx="30" cy="50" r="1.5" />
          <circle cx="38" cy="50" r="1.5" />
          <circle cx="46" cy="50" r="1.5" />
        </svg>
      )

    case 'sleet':
      return (
        <svg {...svgProps}>
          <path d="M18 36h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <circle cx="24" cy="46" r="1.5" />
          <line x1="30" y1="44" x2="28" y2="50" />
          <line x1="38" y1="44" x2="36" y2="50" />
        </svg>
      )

    case 'freezing-rain':
      return (
        <svg {...svgProps}>
          <path d="M18 36h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <circle cx="24" cy="46" r="1.5" />
          <circle cx="32" cy="46" r="1.5" />
          <circle cx="40" cy="46" r="1.5" />
          <line x1="24" y1="44" x2="24" y2="48" />
          <line x1="32" y1="44" x2="32" y2="48" />
          <line x1="40" y1="44" x2="40" y2="48" />
        </svg>
      )

    case 'thunder':
      return (
        <svg {...svgProps}>
          <polyline points="30,24 24,36 29,36 26,46 38,32 32,32 36,24" />
        </svg>
      )

    case 'thunder-rain':
      return (
        <svg {...svgProps}>
          <path d="M16 34h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <polyline points="30,40 26,48 30,48 27,56 38,44 33,44 36,40" />
        </svg>
      )

    case 'ice-pellets':
      return (
        <svg {...svgProps}>
          <path d="M18 36h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
          <circle cx="24" cy="46" r="2" />
          <circle cx="32" cy="46" r="2" />
          <circle cx="40" cy="46" r="2" />
        </svg>
      )

    default:
      return (
        <svg {...svgProps}>
          <path d="M20 44h28a6 6 0 0 0 0-12h-2a8 8 0 0 0-14-4 6 6 0 0 0-10-2 6 6 0 0 0-8 4h-2a5 5 0 0 0 0 10h2z" />
        </svg>
      )
  }
}
