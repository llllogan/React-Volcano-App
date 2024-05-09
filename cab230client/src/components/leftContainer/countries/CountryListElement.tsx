import CountryToIsoCode from "../../../packages/ISOCountryName";
import { useContext } from "react";
import { VolcanoSelectedContext, VolcanoSelectedContextType } from "../../../packages/Context";
import { useNavigate } from '@tanstack/react-router'

interface Props {
  name: string;
}

export default function CountryListElement(props: Props) {
  const isoCountryCode = CountryToIsoCode(props.name);

  const { setVolcanoSelected } = useContext( VolcanoSelectedContext ) as VolcanoSelectedContextType;
  
  const navigate = useNavigate();

  return (
    <li
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
      onClick={() => {
        setVolcanoSelected(false);
        navigate({ to: '/$country', params: { country: props.name } });
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
  );
}
