import { createFileRoute } from '@tanstack/react-router'

import { Map } from '../components/Map/Map'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <div>Hello World</div>
      <Map />
    </>
  )
}
