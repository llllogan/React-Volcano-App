import CountryToIsoCode from "../packages/ISOCountryName";

interface Props {
    name: string;
}

export default function CountryListElement(props: Props) {

  const isoCountryCode = CountryToIsoCode(props.name);


  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
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