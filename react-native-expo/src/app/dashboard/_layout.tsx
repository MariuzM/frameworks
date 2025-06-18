import { Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
      </Tabs>
    </GestureHandlerRootView>
  )
}
