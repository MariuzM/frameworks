import Link from 'next/link'

import './../styles/globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<nav className="flex gap-2 border-b p-4">
					<Link href="/" className="hover:underline">
						Home
					</Link>
					<Link href="/about" className="hover:underline">
						About
					</Link>
				</nav>
				{children}
			</body>
		</html>
	)
}
