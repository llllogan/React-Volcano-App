import { Circle, MapContainer, TileLayer, Tooltip, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Volcano from "../../../packages/Volcano";
import { LatLngTuple } from "leaflet";

interface overlayProps {
  center: LatLngTuple;
  population: number[];
}

function RadiusOverlays(props: overlayProps) {
  const fillBlueOptions = { fillColor: "blue" };
  return (
    <>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={100000}>
        <Tooltip>{props.population[3]} people</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={30000}>
        <Tooltip>{props.population[2]} people</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={10000}>
        <Tooltip>{props.population[1]} people</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={5000}>
        <Tooltip>{props.population[0]} people</Tooltip>
      </Circle>
    </>
  );
}

interface Props {
  volcano: Volcano;
}

export default function Map(props: Props) {
  const volcano = props.volcano;
  const center = volcano.getLatLngTuple();

  const zoomLevel = volcano.hasPopulationData() ? 8 : 12;

  function getRadiusInformation() {

    if (volcano.hasPopulationData()) {
      return (
        RadiusOverlays({
          center: center,
          population: volcano.getPopulationData()
        })
      );
    }
    return null;
  }
  

  return (
    <div>
      <MapContainer
        className="leaflet-container"
        center={center}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getRadiusInformation()}
        <Marker position={center}></Marker>
      </MapContainer>
    </div>
  );
}
