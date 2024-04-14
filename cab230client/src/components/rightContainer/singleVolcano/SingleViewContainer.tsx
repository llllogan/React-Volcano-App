import { useContext } from "react";
import { VolcanoContext, VolcanoContextType } from "../../../packages/Context";
import Volcano from "../../../packages/Volcano";
import Map from "./Map";

export default function SingleViewContainer() {
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const volcano = new Volcano(selectedVolcano);

  return (
    <div>
        <Map volcano={volcano}></Map>
      <h1>{volcano.Name}</h1>
    </div>
  );
}
