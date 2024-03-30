
interface Props {
    name: string;
    code: string;
}

export default function CountryListElement(props: Props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <h5>{props.name}</h5>
      <span>
        <img
          src={"https://flagsapi.com/" + props.code + "/flat/32.png"}
          alt="A flag image"
          title="Flag"
        />
      </span>
    </li>
  );
}