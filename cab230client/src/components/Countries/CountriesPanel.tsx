import { useEffect, useState } from "react";
import volcanoClient from "../../packages/VolcanoClient";
import SearchableCountryList from "./SearchableCountryList";
import '../../App.css';

export default function CountriesPanel() {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesFromClient = await volcanoClient.getCountries();
      setCountries(countriesFromClient);
    };

    fetchCountries();
  }, []);

  
  return (
    <div className="mt-4" id="countryList">
      <h1>Countries</h1>
      <SearchableCountryList countries={countries} />
    </div>
  );
}
