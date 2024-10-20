import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

export default function RootLayout() {
	// added this but i think this is piintless because already configured in app config
	const [loaded, error] = useFonts({
		Figtree: require('../../assets/fonts/Figtree.ttf'),
		FigtreeBold: require('../../assets/fonts/FigtreeBold.ttf'),
	})

	console.log('🚀 ~ loaded:', loaded)
	console.log('🚀 ~ error:', error)

	return (
		<Stack screenOptions={{ animation: 'ios', headerTintColor: 'white' }}>
			<Stack.Screen name="index" />
		</Stack>
	)
}
