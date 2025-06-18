import { Fragment, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import { create } from 'zustand'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

// ------------------------------------------------------------------

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const MARKER_LOCATION = {
  latitude: 37.78825,
  longitude: -122.4324,
}

const MARKER_DATA = {
  name: 'San Francisco Marker',
  description: 'This is a marker in San Francisco',
  coordinates: MARKER_LOCATION,
}

export default function Home() {
  const bsItemRef = useStore((s) => s.bsItemRef)
  const mapRef = useRef<MapView>(null)

  const handleMarkerPress = () => {
    useStore.getState().setBsItem(MARKER_DATA)
    bsItemRef?.current?.snapToIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={INITIAL_REGION} mapType="standard">
          <Marker
            coordinate={MARKER_LOCATION}
            title="San Francisco"
            description="Tap to see details"
            onPress={handleMarkerPress}
          />
        </MapView>

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
