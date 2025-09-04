import { useRouter } from 'expo-router'
import { Button, Keyboard, TextInput, View } from 'react-native'

export default function App() {
  const router = useRouter()

  const handleNavigation = () => {
    Keyboard.dismiss()
    router.push('/dashboard')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Map" onPress={handleNavigation} />
      <TextInput placeholder="Enter your name" />
    </View>
  )
}
