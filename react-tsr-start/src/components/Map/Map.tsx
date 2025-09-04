import './map.css'

import mapboxgl from 'mapbox-gl'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const getSeverityColor = (severity: number): string => {
  switch (severity) {
    case 1:
      return '#4ade80'
    case 2:
      return '#a3e635'
    case 3:
      return '#facc15'
    case 4:
      return '#fb923c'
    case 5:
      return '#ef4444'
    default:
      return '#3b82f6'
  }
}

const MapComponent = ({
  className = '',
  center = [23.8813, 55.1694],
  zoom = 7,
  reports = [],
}: {
  className?: string
  center?: [number, number]
  zoom?: number
  reports?: any[]
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapInitialized, setMapInitialized] = useState(false)

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []
  }, [])

  const renderMarkers = useCallback(
    (mapInstance: mapboxgl.Map, reportsData: any[]) => {
      clearMarkers()
      if (!reportsData.length) return

      console.log('Rendering markers for reports:', reportsData.length)

      reportsData.forEach((report) => {
        try {
          if (!report.coordinates || report.coordinates.length !== 2) {
            console.error(`Invalid coordinates for report ${report.id}:`, report.coordinates)
            return
          }

          const [lng, lat] = report.coordinates

          if (isNaN(lng) || isNaN(lat)) {
            console.error(`Invalid coordinate values for report ${report.id}:`, lng, lat)
            return
          }

          if (lng < 20 || lng > 27 || lat < 53 || lat > 57) {
            console.warn(`Coordinates outside Lithuania bounds for report ${report.id}:`, lng, lat)
          }

          const el = document.createElement('div')
          el.className = 'marker'
          el.style.width = '25px'
          el.style.height = '25px'
          el.style.borderRadius = '50%'
          el.style.backgroundColor = getSeverityColor(report.severity)
          el.style.border = '2px solid white'
          el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)'
          el.style.cursor = 'pointer'
          const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(mapInstance)
          markersRef.current.push(marker)
          console.log(`Added marker for report ${report.id} at:`, lng, lat)
        } catch (error) {
          console.error('Error adding marker for report:', report.id, error)
        }
      })

      console.log(`Successfully added ${markersRef.current.length} markers`)
    },
    [clearMarkers],
  )

  useEffect(() => {
    if (map.current || !mapContainer.current) return
    mapboxgl.accessToken = TOKEN

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center,
        zoom,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.current.on('load', () => {
        console.log('Map loaded')
        setMapInitialized(true)
      })

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e.error)
      })
    } catch (error) {
      console.error('Error initializing map:', error)
    }

    return () => {
      clearMarkers()
      if (map.current) {
        map.current.remove()
        map.current = null
      }
      setMapInitialized(false)
    }
  }, [center, zoom, clearMarkers])

  useEffect(() => {
    if (!map.current || !mapInitialized) return
    renderMarkers(map.current, reports)
  }, [mapInitialized, reports, renderMarkers])

  return (
    <div
      ref={mapContainer}
      className={`h-full w-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  )
}

export const Map = memo(MapComponent)
Map.displayName = 'Map'
