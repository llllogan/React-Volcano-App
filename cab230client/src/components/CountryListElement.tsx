
interface Props {
    name: string;
    code: string;
}

function CountryListElement(props: Props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <h5>{props.name}</h5>
      <span>
        <img
          src={"https://flagsapi.com/" + props.code + "/flat/32.png"}
          alt="Flag of Belgium"
          title="Flag of Belgium"
        />
      </span>
    </li>
  );
}

export default CountryListElement;