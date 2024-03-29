import CountryListElement from "./CountryListElement";

function CountryList() {
  return (
    <>
      <ul className="list-group">
        <CountryListElement name="Australia" code="AU" />
      </ul>
    </>
  );
}

export default CountryList;
