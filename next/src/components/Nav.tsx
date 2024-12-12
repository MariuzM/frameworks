'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Admin', href: '/admin' },
	{ label: 'Admin About', href: '/admin/about' },
]

export const Nav = ({ onEditSave }: { onEditSave: (data: any) => void }) => {
	const path = usePathname()
	console.log('🚀 ~ path:', path)
	return (
		<div className="bg-blue-200">
			Default Layout
			<nav className="bg-green-200">
				Nav Links:
				<div className="flex gap-4">
					{NAV.map(({ label, href }) => (
						<Link className={path === href ? 'bg-slate-400' : ''} key={label} href={href}>
							{label}
						</Link>
					))}
				</div>
			</nav>
			<slot />
		</div>
	)
}
