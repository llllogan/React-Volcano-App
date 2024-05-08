import CountryToIsoCode from "../../../packages/ISOCountryName";
import { useContext } from "react";
import { CountryContext, CountryContextType, VolcanoSelectedContext, VolcanoSelectedContextType } from "../../../packages/Context";
import { Link } from '@tanstack/react-router'

interface Props {
  name: string;
}

export default function CountryListElement(props: Props) {
  const isoCountryCode = CountryToIsoCode(props.name);

  const { setSelectedCountry } = useContext( CountryContext ) as CountryContextType;
  const { setVolcanoSelected } = useContext( VolcanoSelectedContext ) as VolcanoSelectedContextType;

  return (
    <Link to={'/volcanos'}>
    <li
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
      onClick={() => {
        setSelectedCountry({
          name: props.name,
          code: isoCountryCode,
          volcanoes: [],
        });
        setVolcanoSelected(false);
      }}
    >
      <h5>{props.name}</h5>
      <span>
        <img
          src={"https://flagsapi.com/" + isoCountryCode + "/flat/32.png"}
          alt="A flag image"
          title="Flag"
        />
      </span>
    </li>
    </Link>
  );
}
