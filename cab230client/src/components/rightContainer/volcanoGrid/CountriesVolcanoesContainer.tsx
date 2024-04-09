import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../../packages/Context";

import VolcanoGridInputs from "./VolcanoGridInputs";

export default function CountriesVolcanoesContainer() {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;

  return (
    <>
      <div className="d-flex justify-context-between">
        <h1 className="p-2 flex-grow-1">{selectedCountry.name}</h1>
        <span>
          <img
            src={
              "https://flagsapi.com/" + selectedCountry.code + "/flat/64.png"
            }
            alt="A flag image"
            title="Flag"
            className=""
          />
        </span>
      </div>
      <VolcanoGridInputs />
    </>
  );
}
