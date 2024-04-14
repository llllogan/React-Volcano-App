import { useContext, useEffect, useState } from "react";
import { VolcanoContext, VolcanoContextType } from "../../../packages/Context";
import Volcano from "../../../packages/Volcano";
import Map from "./Map";
import volcanoClient from "../../../packages/VolcanoClient";

export default function SingleViewContainer() {
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const [volcano, setVolcano] = useState<Volcano>(new Volcano(selectedVolcano));
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const getVolcanoFromApi = async () => {
      const volcanoData: Volcano = await volcanoClient.getVolcanoById(
        volcano.getId()
      );
      setVolcano(volcanoData);
      setMapLoaded(true);
    };

    getVolcanoFromApi();
  }, []);

  return (
    <div>
      {mapLoaded ? (<Map volcano={volcano}></Map>) : null}
      <h1>{volcano.Name}</h1>
    </div>
  );
}
