import { createFileRoute } from '@tanstack/react-router'

import { Agenda } from '../components/Agenda'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<div className="p-2">
			<Agenda />
		</div>
	)
}
