import { Text, View } from 'react-native'

import { BottomSheetView } from '../components/BottomSheet'

export default function HomePage() {
	return (
		<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<Text>Expo SDK 51 - newArch: false</Text>
			<BottomSheetView />
		</View>
	)
}
