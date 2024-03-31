import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import "../../App";

function filterCountries(searchTerm: string, countries: string[]) {
  
  const filterCountries: string[] = [];

  countries.filter((country) => {
    if (country.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      filterCountries.push(country);
    }
  });

  countries.filter((country) => {
    if (country.toLowerCase().includes(searchTerm.toLowerCase())) {
      if (!filterCountries.includes(country)) {
        filterCountries.push(country);
      }
    }
  });

  return filterCountries;

}

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
        onChange={(e) => {
          const searchTerm = e.target.value;
          const filteredCountries = filterCountries(searchTerm, props.countries);
          setCountries(filteredCountries);
        }}
          
      />
      <CountryList countries={countries}/>
    </>
  );
}
