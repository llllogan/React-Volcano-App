import { createFileRoute } from '@tanstack/react-router'
import CountriesVolcanoesContainer from '../components/rightContainer/volcanoList/CountriesVolcanoesContainer'

export const Route = createFileRoute('/$country')({
  component: VolcanoTable
})

function VolcanoTable() {
  const { country } = Route.useParams();
  return (
    <CountriesVolcanoesContainer />
  )
}