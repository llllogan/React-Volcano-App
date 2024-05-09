import { createFileRoute } from '@tanstack/react-router'
import CountriesVolcanoesContainer from '../components/rightContainer/volcanoList/CountriesVolcanoesContainer'
import { CountryContext, CountryContextType } from '../packages/Context';
import { useContext } from 'react';

export const Route = createFileRoute('/$country')({
  component: VolcanoTable
})

function VolcanoTable() {

  const { country } = Route.useParams();
  const { setSelectedCountry } = useContext( CountryContext ) as CountryContextType;

  setSelectedCountry(country);
  
  return (
    <CountriesVolcanoesContainer />
  )
}