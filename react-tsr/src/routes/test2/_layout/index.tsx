import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test2/_layout/')({
	component: () => <div>Hello /test2/_layout/!</div>,
})
