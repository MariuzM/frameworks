import { useRef } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

export default function Map() {
  return (
    <GestureHandlerRootView>
      <BSheet />
    </GestureHandlerRootView>
  )
}

const BSheet = () => {
  const ref = useRef<BottomSheet>(null)
  return (
    <BottomSheet ref={ref} snapPoints={['20%', '50%', '90%']} enablePanDownToClose index={-1}>
      <BottomSheetScrollView style={{ flex: 1, backgroundColor: 'red' }}>
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
