import { useContext } from "react";
import {
  CountryContext,
  CountryContextType,
  VolcanoSelectedContext,
  VolcanoSelectedContextType,
} from "../../packages/Context";

import CountriesVolcanoesContainer from "./volcanoList/CountriesVolcanoesContainer";
import SingleViewContainer from "./singleVolcano/SingleViewContainer";

export default function RightPanelContainer() {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;
  const { volcanoSelected } = useContext(VolcanoSelectedContext) as VolcanoSelectedContextType;

  // When a volcano is selected from the grid, show its details page
  if (volcanoSelected) {
    return <SingleViewContainer />;
  }

  // If not, show a grid of volcanos for the selected country
  if (selectedCountry !== undefined) {
    return <CountriesVolcanoesContainer />;
  }

  // If no country is selected, show a message
  return (
    <div>
      <h1>No Country Selected</h1>
    </div>
  );
}
