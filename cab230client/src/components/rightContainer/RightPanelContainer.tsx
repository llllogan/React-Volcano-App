import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../packages/Context";

import CountriesVolcanoesContainer from "./volcanoList/CountriesVolcanoesContainer";


export default function RightPanelContainer() {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;

  if (selectedCountry.name !== undefined) {
    return (
      <CountriesVolcanoesContainer />
    );
  } else {
    return (
      <div>
        <h1>No Country Selected</h1>
      </div>
    );
  }
  // Here you also need to account for single volcano view
}
