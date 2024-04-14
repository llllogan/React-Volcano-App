import { useContext } from "react";
import { VolcanoContext, VolcanoContextType } from "../../../packages/Context";
import Volcano from "../../../packages/Volcano";

export default function SingleViewContainer() {
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const volcano = new Volcano(selectedVolcano);

  return (
    <div>
      <h1>Single View Container</h1>
      <h1>{volcano.Name}</h1>
    </div>
  );
}
