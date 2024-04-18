import { Circle, MapContainer, TileLayer, Tooltip, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Volcano from "../../../packages/Volcano";
import { LatLngTuple } from "leaflet";

interface overlayProps {
  center: LatLngTuple;
}

function RadiusOverlays(props: overlayProps) {
  const fillBlueOptions = { fillColor: "blue" };
  return (
    <>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={100000}>
        <Tooltip>100km radius circle</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={30000}>
        <Tooltip>30km radius circle</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={10000}>
        <Tooltip>10km radius circle</Tooltip>
      </Circle>
      <Circle center={props.center} pathOptions={fillBlueOptions} radius={5000}>
        <Tooltip>5km radius circle</Tooltip>
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
        {volcano.hasPopulationData() ? RadiusOverlays({center}) : null}
        <Marker position={center}></Marker>
      </MapContainer>
    </div>
  );
}
