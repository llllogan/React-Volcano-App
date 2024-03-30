import { useEffect, useState } from "react";
import CountryList from "./CountryList";

interface Props {
  countries: string[];
}

export default function SearchableCountryList(props: Props) {
  const [countries, setCountries] = useState<string[]>(props.countries);

  useEffect(() => {
    setCountries(props.countries);
  }, [props.countries]);

  return (
    <>
      <input
        type="text"
        placeholder="Start typing to refine the list..."
        className="form-control mb-3"
        id="countrySearchTerm"
      />
      <CountryList countries={countries}/>
    </>
  );
}
