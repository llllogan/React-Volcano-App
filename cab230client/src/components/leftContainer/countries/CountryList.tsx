import { useEffect, useState } from "react";
import CountryListElement from "./CountryListElement";
import { Link } from '@tanstack/react-router'

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
      <ul className="list-group overflow-auto">
        {countries.map((name, index) => (
          <Link to={'/volcanoTable'}>
            <CountryListElement key={index} name={name} />
          </Link>
        ))}
      </ul>
    </>
  );
}
