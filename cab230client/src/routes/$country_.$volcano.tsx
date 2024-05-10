import { createFileRoute } from "@tanstack/react-router";
import SingleViewContainer from "../components/rightContainer/singleVolcano/SingleViewContainer";
import { useContext, useEffect, useState } from "react";
import { CountryContext, CountryContextType, VolcanoClientContext, VolcanoClientContextType, VolcanoContext, VolcanoContextType } from "../packages/Context";

export const Route = createFileRoute("/$country/$volcano")({
  component: DetailedVolcanoView,
});

function DetailedVolcanoView() {

  const { country, volcano } = Route.useParams();

  const { setSelectedVolcano } = useContext(VolcanoContext  ) as VolcanoContextType;
  const { setSelectedCountry } = useContext(CountryContext) as CountryContextType;
  const { volcanoClient } = useContext(VolcanoClientContext) as VolcanoClientContextType;
  const [volcanoLoaded, setVolcanoLoaded] = useState(false);

  setSelectedCountry(country);

  useEffect(() => {
    const getVolcanoFromApi = async () => {
      const volcanoFromApi = await volcanoClient.getVolcanoByName(
        country,
        volcano
      );
      if (volcanoFromApi !== undefined) {
        console.log(volcanoFromApi);
        setSelectedVolcano(volcanoFromApi);
        console.log(volcanoFromApi);
        setVolcanoLoaded(true);
      }
    }
    getVolcanoFromApi();
  }, [volcanoClient]);

  return <>{volcanoLoaded ? <SingleViewContainer /> : null}</>;
}
