import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: Root,
})

const GROUP_NAV = [
	[
		{ to: '/test', label: 'Test' },
		{ to: '/test/about', label: 'About' },
		{ to: '/test/user/about', label: 'User About' },
	],
	[
		{ to: '/test2', label: 'Test2' },
		{ to: '/test2/about', label: 'About' },
	],
	[
		{ to: '/test3', label: 'Test3' },
		{ to: '/test3/about', label: 'About' },
	],
	[
		{ to: '/test4/auth', label: 'Test4' },
		{ to: '/test4/auth/about', label: 'About' },
	],
	[
		{ to: '/test5', label: 'Test5' },
		{ to: '/test5/about', label: 'About' },
	],
]

function Root() {
	return (
		<>
			{/* <div className="flex gap-10 p-2 text-lg">
				{GROUP_NAV.map((group, i) => (
					<div key={i} className="flex flex-col gap-2 bg-gray-600">
						{group.map(({ to, label }) => (
							<Link key={to} to={to} activeProps={{ className: 'text-red-500' }}>
								- {label}
							</Link>
						))}
					</div>
				))}
			</div>
			<hr /> */}
			<Outlet />
		</>
	)
}
