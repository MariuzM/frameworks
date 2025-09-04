import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="bg-test p-2 text-lg">
      <h3>Welcome Home!!!</h3>
    </div>
  )
}
