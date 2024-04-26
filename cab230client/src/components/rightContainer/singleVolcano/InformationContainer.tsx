import Volcano from "../../../packages/Volcano";
import InformationBrick from "./InformationBrick";
import { BarChart } from '@mui/x-charts/BarChart';

interface Props {
  volcano: Volcano;
}

export default function InformationContainer(props: Props) {

  const pop100 = [1000];
  const pop30 = [400];
  const pop10 = [200];
  const pop5 = [100];
  const label = ['Population Spread'];



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
      <BarChart
        className="col"
        width={600}
        height={220}
        series={[
          { data: pop100, label: "100km", id: "pop100Id", stack: "total" },
          { data: pop30, label: "30km", id: "pop30Id", stack: "total" },
          { data: pop10, label: "10km", id: "pop10Id", stack: "total" },
          { data: pop5, label: "5km", id: "pop5Id", stack: "total" },
        ]}
        xAxis={[{ data: label, scaleType: "band" }]}
      />
    </div>
  );
}
