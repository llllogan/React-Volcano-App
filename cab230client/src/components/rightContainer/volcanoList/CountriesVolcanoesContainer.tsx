import { useContext } from "react";
import { CountryContext, CountryContextType } from "../../../packages/Context";
import VolcanoGridInputs from "./VolcanoGridInputs";
import CountryToIsoCode from "../../../packages/ISOCountryName";


export default function CountriesVolcanoesContainer() {

  const { selectedCountry } = useContext(CountryContext) as CountryContextType;
  const countryCode = CountryToIsoCode(selectedCountry);

  console.log(selectedCountry);

  return (
    <>
      <div className="d-flex justify-context-between">
        <h1 className="p-2 flex-grow-1">{typeof selectedCountry === 'string' ? selectedCountry : "loading"}</h1>
        <span>
          <img
            src={
              "https://flagsapi.com/" + countryCode + "/flat/64.png"
            }
            alt="A flag image"
            title="Flag"
          />
        </span>
      </div>
      {typeof selectedCountry === 'string' ? <VolcanoGridInputs /> : null}
    </>
  );
}
