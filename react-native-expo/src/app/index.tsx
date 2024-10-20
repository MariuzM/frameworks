import type { TextStyle } from 'react-native'
import { Platform, Text, View } from 'react-native'

const getFontStyles = (isBold: boolean): TextStyle => {
	if (Platform.OS === 'ios') {
		return { fontFamily: 'Figtree', fontWeight: isBold ? 'bold' : 'normal' }
	} else {
		return { fontFamily: isBold ? 'FigtreeBold' : 'Figtree' }
	}
}

export default function HomePage({ isBold = false }: { isBold?: boolean }) {
	const fonts = getFontStyles(isBold)

	return (
		<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<Text style={{ fontSize: 40, ...fonts }}>This is my Font @</Text>
		</View>
	)
}
