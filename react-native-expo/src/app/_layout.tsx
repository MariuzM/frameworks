import { Stack } from 'expo-router'

export default function RootLayout() {
	return (
		<Stack screenOptions={{ animation: 'ios', headerTintColor: 'white' }}>
			<Stack.Screen name="index" />
		</Stack>
	)
}
