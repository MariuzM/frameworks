import { useRouter } from 'expo-router'
import { Button, TextInput, View } from 'react-native'

export default function App() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Map" onPress={() => router.push('/dashboard')} />
      <TextInput placeholder="Enter your name" />
    </View>
  )
}
