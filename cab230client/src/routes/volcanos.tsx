import { createFileRoute } from '@tanstack/react-router'
import CountriesVolcanoesContainer from '../components/rightContainer/volcanoList/CountriesVolcanoesContainer'

export const Route = createFileRoute('/volcanos')({
  component: VolcanoTable
})

function VolcanoTable() {
  return (
    <CountriesVolcanoesContainer />
  )
}