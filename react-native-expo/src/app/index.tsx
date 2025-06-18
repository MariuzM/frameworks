import { Fragment, useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={false}
        showsMyLocationButton={false}
        mapType="standard"
      >
        <Marker
          coordinate={MARKER_LOCATION}
          title="San Francisco"
          description="Tap to see details"
          onPress={handleMarkerPress}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Open From State" onPress={() => bsItemRef?.current?.snapToIndex(1)} />
      </View>

      <BSheet />
    </View>
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
    <GestureHandlerRootView style={styles.gestureContainer}>
      <BottomSheet ref={ref} snapPoints={['20%', '50%', '90%']} enablePanDownToClose index={-1}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.sheetContent}>
            {bsItem ? (
              <Fragment>
                <Text style={styles.title}>{bsItem.name}</Text>
                <Text style={styles.description}>{bsItem.description}</Text>
                {bsItem.coordinates && (
                  <Text style={styles.coordinates}>
                    Lat: {bsItem.coordinates.latitude.toFixed(4)}, Lng:{' '}
                    {bsItem.coordinates.longitude.toFixed(4)}
                  </Text>
                )}
              </Fragment>
            ) : (
              <Text style={styles.title}>Awesome 🎉</Text>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  gestureContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  contentContainer: {
    flex: 1,
  },
  sheetContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  coordinates: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'monospace',
  },
})
