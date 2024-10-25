import { useState } from 'react'
import { NextUIProvider, Pagination } from '@nextui-org/react'
import { keepPreviousData, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const queryClient = new QueryClient()

export const Route = createFileRoute('/test8/tsq')({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider>
				<Tsq />
			</NextUIProvider>
		</QueryClientProvider>
	),
})

const fetchData = async (page: number) => {
	const r = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`)
	if (!r.ok) throw new Error('Network response was not ok')
	return { pages: 4, items: await r.json() }
}

const Tsq = () => {
	const [page, setPage] = useState(1)
	const { data } = useQuery({
		queryKey: ['posts', page],
		queryFn: () => fetchData(page),
		placeholderData: keepPreviousData,
	})

	return (
		<div>
			<p>TSQ page</p>

			{data?.pages && (
				<Pagination total={data.pages} page={page} initialPage={1} onChange={setPage} />
			)}

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
