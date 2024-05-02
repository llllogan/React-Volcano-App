import {
  Circle,
  MapContainer,
  TileLayer,
  Tooltip,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Volcano from "../../../packages/Volcano";
import { LatLng, LatLngTuple } from "leaflet";
import { useContext, useEffect, useState } from "react";
import {
  VolcanoClientContext,
  VolcanoClientContextType,
  VolcanoContext,
  VolcanoContextType,
} from "../../../packages/Context";

interface overlayProps {
  center: LatLngTuple;
  population: number[];
}

function RadiusOverlays(props: overlayProps) {
  const fillBlueOptions = { fillColor: "blue" };
  return (
    <>
      <Circle
        center={props.center}
        pathOptions={fillBlueOptions}
        radius={100000}
      >
        <Tooltip>{props.population[3]} people</Tooltip>
      </Circle>
      <Circle
        center={props.center}
        pathOptions={fillBlueOptions}
        radius={30000}
      >
        <Tooltip>{props.population[2]} people</Tooltip>
      </Circle>
      <Circle
        center={props.center}
        pathOptions={fillBlueOptions}
        radius={10000}
      >
        <Tooltip>{props.population[1]} people</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={5000}>
        <Tooltip>{props.population[0]} people</Tooltip>
      </Circle>
    </>
  );
}

export default function Map() {
  const { selectedVolcano } = useContext(VolcanoContext) as VolcanoContextType;
  const { volcanoClient } = useContext(
    VolcanoClientContext
  ) as VolcanoClientContextType;
  const [volcano, setVolcano] = useState<Volcano>(new Volcano(selectedVolcano));
  const [center, setCenter] = useState<LatLngTuple>([0, 0]);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const getVolcanoFromApi = async () => {
      const volcanoData: Volcano = await volcanoClient.getVolcanoById(
        volcano.getId()
      );
      volcanoData.Id = volcano.getId();
      setVolcano(volcanoData);
      setCenter(volcanoData.getLatLngTuple());

      if (volcanoData.hasPopulationData()) {
        setZoom(8);
      }
    };

    getVolcanoFromApi();
  }, [volcanoClient]);

  const RecenterAutomatically = ({center}: {center: LatLngTuple}) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, center);
    return null;
  };

  const ZoomAutomatically = ({zoomLevel}: {zoomLevel: number}) => {
    const map = useMap();
    useEffect(() => {
      map.setZoom(zoomLevel);
    }, [zoomLevel]);
    return null;
  };

  function getRadiusInformation() {
    if (volcano.hasPopulationData()) {
      return RadiusOverlays({
        center: volcano.getLatLngTuple(),
        population: volcano.getPopulationData(),
      });
    }
    return null;
  }

  console.log("I have been rendered");
  console.log(center);

  return (
    <div>
      <MapContainer
        className="leaflet-container"
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getRadiusInformation()}
        <Marker position={center}></Marker>
        <RecenterAutomatically center={center} />
        <ZoomAutomatically zoomLevel={zoom} />
      </MapContainer>
    </div>
  );
}