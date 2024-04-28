import { useContext, useEffect, useState } from "react";
import {
  CountryContext,
  CountryContextType,
  VolcanoClientContext,
  VolcanoClientContextType,
  VolcanoContext,
  VolcanoContextType,
  VolcanoSelectedContext,
  VolcanoSelectedContextType,
} from "../../../packages/Context";
import Volcano from "../../../packages/Volcano";
import Map from "./Map";
import InformationContainer from "./InformationContainer";
import { BarChart } from "@mui/x-charts";

export default function SingleViewContainer() {
  const { selectedCountry } = useContext(CountryContext) as CountryContextType;
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const { volcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;
  const { setVolcanoSelected } = useContext(VolcanoSelectedContext) as VolcanoSelectedContextType;

  const [volcano, setVolcano] = useState<Volcano>(new Volcano(selectedVolcano));
  const [populationData, setPopulationData] = useState<number[]>([0, 0, 0, 0]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const getVolcanoFromApi = async () => {
      const volcanoData: Volcano = await volcanoClient.getVolcanoById(
        volcano.getId()
      );
      volcanoData.Id = volcano.getId();
      setVolcano(volcanoData);
      setMapLoaded(true);
    };

    getVolcanoFromApi();
  }, [volcanoClient]);

  return (
    <div>
      {mapLoaded ? <Map/> : null}
      <div className="row pt-4">
        <div className="col">
          <h1 className="">{volcano.Name}</h1>
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => {
              setVolcanoSelected(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            Back to {selectedCountry.name}
          </button>
          <InformationContainer volcano={volcano} />
        </div>
        {volcano.hasPopulationData() ? (
          <div className="col">
            <BarChart
              className="col"
              width={580}
              height={350}
              series={[
                { data: [volcano.getPopulation100km()], label: "100km", id: "pop100Id", stack: "total" },
                { data: [volcano.getPopulation30km()], label: "30km", id: "pop30Id", stack: "total" },
                { data: [volcano.getPopulation10km()], label: "10km", id: "pop10Id", stack: "total" },
                { data: [volcano.getPopulation5km()], label: "5km", id: "pop5Id", stack: "total" },
              ]}
              xAxis={[{ data: ["Population Spread"], scaleType: "band" }]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
