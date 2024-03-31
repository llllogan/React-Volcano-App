import { useEffect, useState } from "react";
import CountryListElement from "./CountryListElement";
import "../../App";

interface Props {
  countries: string[];
}

export default function CountryList(props: Props) {
  const [countries, setCountries] = useState<string[]>(props.countries);

  useEffect(() => {
    setCountries(props.countries);
  }, [props.countries]);

  return (
    <>
      <ul className="list-group overflow-auto" id="countryList">
        {countries.map((name, index) => (
          <CountryListElement key={index} name={name} />
        ))}
      </ul>
    </>
  );
}
