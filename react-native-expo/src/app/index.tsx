import { useCallback, useEffect, useRef } from 'react'
import { Button, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { create } from 'zustand'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

// ------------------------------------------------------------------

export default function Home() {
  const bsItemRef = useStore((s) => s.bsItemRef)
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d7d7d7',
      }}
    >
      <Button title="Open From State" onPress={() => bsItemRef?.current?.snapToIndex(1)} />
      <BSheet />
    </View>
  )
}

// ------------------------------------------------------------------

const BSheet = () => {
  const ref = useRef<BottomSheet>(null)

  useEffect(() => {
    useStore.setState({ bsItemRef: ref as React.RefObject<BottomSheet> })
  }, [])

  const onChange = useCallback((i: number) => {
    console.log('handleSheetChanges', i)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
      <Button title="Open from BSheet" onPress={() => ref.current?.snapToIndex(1)} />
      <BottomSheet
        ref={ref}
        onChange={onChange}
        snapPoints={['20%', '50%', '90%']}
        enablePanDownToClose
        index={-1}
      >
        <BottomSheetScrollView>
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

// ------------------------------------------------------------------

type Item = {
  name: string
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
