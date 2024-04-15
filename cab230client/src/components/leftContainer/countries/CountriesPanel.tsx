import { useContext, useEffect, useState } from "react";
import SearchableCountryList from "./SearchableCountryList";
import { VolcanoClientContext, VolcanoClientContextType } from "../../../packages/Context";

export default function CountriesPanel() {
  const [countries, setCountries] = useState<string[]>([]);

  const { volcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesFromClient = await volcanoClient.getCountries();
      setCountries(countriesFromClient);
    };

    fetchCountries();
  }, [volcanoClient]);

  return (
    <div className="mt-4">
      <h1>Countries</h1>
      <SearchableCountryList countries={countries} />
    </div>
  );
}
