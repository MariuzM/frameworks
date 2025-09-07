import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { supabase } from '../providers/supabase.provider'

export const Route = createFileRoute('/auth-test')({
	component: RouteComponent,
})

function RouteComponent() {
	useEffect(() => {
		const main = async () => {
			await supabase.auth.signInWithPassword({
				email: 'me@marius.dev',
				password: 'Mc8hRzqMaWBVaG',
			})
		}

		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session)
		})

		main()
	}, [])
	return <div>Hello "/auth"!</div>
}
