import { Fragment, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { create } from 'zustand'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import Mapbox, { MapView } from '@rnmapbox/maps'

// ------------------------------------------------------------------

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAP_API as string)
Mapbox.setTelemetryEnabled(false)

const INITIAL_COORDINATES = [-122.4324, 37.78825] // [longitude, latitude] for Mapbox
const INITIAL_ZOOM = 12

const MARKER_LOCATION = {
  latitude: 37.78825,
  longitude: -122.4324,
}

const MARKER_DATA = {
  name: 'San Francisco Marker',
  description: 'This is a marker in San Francisco',
  coordinates: MARKER_LOCATION,
}

export default function Map() {
  const bsItemRef = useStore((s) => s.bsItemRef)
  const mapRef = useRef<MapView>(null)

  const handleMarkerPress = () => {
    useStore.getState().setBsItem(MARKER_DATA)
    bsItemRef?.current?.snapToIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        {/* <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          styleURL={Mapbox.StyleURL.Street}
          logoEnabled={false}
          scaleBarEnabled={false}
        >
          <Camera
            animationDuration={0}
            centerCoordinate={INITIAL_COORDINATES}
            zoomLevel={INITIAL_ZOOM}
          />
          <PointAnnotation
            id="san-francisco-marker"
            coordinate={[MARKER_LOCATION.longitude, MARKER_LOCATION.latitude]}
            onSelected={handleMarkerPress}
          >
            <View
              style={{
                backgroundColor: 'red',
                borderColor: 'white',
                borderRadius: 15,
                borderWidth: 2,
                height: 30,
                width: 30,
              }}
            />
          </PointAnnotation>

          <ShapeSource
            id="point-annotation"
            cluster
            shape={featureCollection(
              [{ longitude: -122.44, latitude: 37.78825 }]?.map((item) =>
                point([item.longitude, item.latitude], { item }),
              ),
            )}
            onPress={handleMarkerPress}
          >
            <SymbolLayer
              id="clusters-count"
              style={{
                textColor: '#ffffff',
                textField: ['get', 'point_count'],
                textPitchAlignment: 'map',
                textSize: 18,
              }}
            />
            <CircleLayer
              id="clusters"
              belowLayerID="clusters-count"
              filter={['has', 'point_count']}
              style={{
                circleColor: '#000000',
                circleOpacity: 1,
                circlePitchAlignment: 'map',
                circleRadius: 20,
                circleStrokeColor: '#000000',
                circleStrokeWidth: 2,
              }}
            />
            <SymbolLayer
              id="item-icons"
              filter={['!', ['has', 'point_count']]}
              style={{
                iconAllowOverlap: true,
                iconAnchor: 'bottom',
                iconImage: 'pin',
                iconSize: 0.5,
                textAllowOverlap: false,
                textAnchor: 'bottom',
                textColor: '#000',
                textField: ['get', 'name', ['get', 'scooter']],
                textHaloWidth: 1,
                textOffset: [0, 1],
                textSize: 14,
              }}
            />
            <Images images={{ pin: require('../../assets/pin.png') }} />
          </ShapeSource>
        </MapView> */}

        <BSheet />
      </View>
    </GestureHandlerRootView>
  )
}

// ------------------------------------------------------------------

const BSheet = () => {
  const ref = useRef<BottomSheet>(null)
  const bsItem = useStore((s) => s.bsItem)

  useEffect(() => {
    useStore.setState({ bsItemRef: ref as React.RefObject<BottomSheet> })
  }, [])

  return (
    <BottomSheet ref={ref} snapPoints={['20%', '50%', '90%']} enablePanDownToClose index={-1}>
      <BottomSheetScrollView>
        <View>
          {bsItem ? (
            <Fragment>
              <Text>{bsItem.name}</Text>
              <Text>{bsItem.description}</Text>
              {bsItem.coordinates && (
                <Text>
                  Lat: {bsItem.coordinates.latitude.toFixed(4)}, Lng:{' '}
                  {bsItem.coordinates.longitude.toFixed(4)}
                </Text>
              )}
            </Fragment>
          ) : (
            <Text>Awesome 🎉</Text>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

// ------------------------------------------------------------------

type Item = {
  name: string
  description?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

type T = {
  bsItemRef: React.RefObject<BottomSheet> | null
  bsItem: Item | null
  setBsItem: (item: Item | null) => void
}

const useStore = create<T>((set): T => {
  return {
    bsItemRef: null,
    bsItem: null,
    setBsItem: (item) => set({ bsItem: item }),
  }
})

// ------------------------------------------------------------------
