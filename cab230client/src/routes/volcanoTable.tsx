import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/volcanoTable')({
  component: VolcanoTable
})

function VolcanoTable() {
  return (
    <div>
      <h1>Volcano Table</h1>
    </div>
  )
}