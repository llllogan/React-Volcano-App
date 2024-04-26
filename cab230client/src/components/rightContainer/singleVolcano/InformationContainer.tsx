import Volcano from "../../../packages/Volcano";
import InformationBrick from "./InformationBrick";

interface Props {
  volcano: Volcano;
}

export default function InformationContainer(props: Props) {

  return (
    <div className="row py-4">
      <div className="col">
        <InformationBrick 
          title="country" 
          information={props.volcano.Country} />
        <InformationBrick 
          title="region" 
          information={props.volcano.Region} />
        <InformationBrick
          title="subregion"
          information={props.volcano.Subregion}
        />
      </div>
      <div className="col">
        <InformationBrick
          title="summit"
          information={props.volcano.getSummit() + "m"}
        />
        <InformationBrick
          title="elevation"
          information={props.volcano.getElevation() + "m"}
        />
        <InformationBrick
          title="last eruption"
          information={props.volcano.getLastEruption()}
        />
      </div>
    </div>
  );
}
