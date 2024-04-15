import { useContext, useEffect, useState } from "react";
import { CountryContext, CountryContextType, VolcanoClientContext, VolcanoClientContextType, VolcanoContext, VolcanoContextType, VolcanoSelectedContext, VolcanoSelectedContextType } from "../../../packages/Context";
import Volcano from "../../../packages/Volcano";
import Map from "./Map";
import InformationContainer from "./InformationContainer";

export default function SingleViewContainer() {
  
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const { volcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;

  const { setVolcanoSelected } = useContext(VolcanoSelectedContext) as VolcanoSelectedContextType;
  
  const [volcano, setVolcano] = useState<Volcano>(new Volcano(selectedVolcano));
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("Selected Volcano", selectedVolcano);
    console.log("Volcano", volcano);
    const getVolcanoFromApi = async () => {
      const volcanoData: Volcano = await volcanoClient.getVolcanoById(
        volcano.getId()
      );
      setVolcano(volcanoData);
      setMapLoaded(true);
    };

    getVolcanoFromApi();
  }, [volcano, volcanoClient]);

  return (
    <div>
      {mapLoaded ? (<Map volcano={volcano}></Map>) : null}
      <h1 className="pt-4">{volcano.Name}</h1>
      <InformationContainer volcano={volcano}/>
      <button className="btn btn-outline-secondary" type="button" onClick={
        () => {
          setVolcanoSelected(false);
        }
      }>Back to {selectedCountry.name}</button>
    </div>
  );
}
