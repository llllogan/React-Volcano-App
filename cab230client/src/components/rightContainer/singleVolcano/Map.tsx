import { Circle, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Volcano from "../../../packages/Volcano";

interface Props {
  volcano: Volcano;
}

export default function Map(props: Props) {

  const volcano = props.volcano;
  const center = volcano.getLatLngTuple();

  const fillBlueOptions = { fillColor: "blue" };

  console.log("I have loaded");

  return (
    <div>
      <MapContainer
        className="leaflet-container"
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "600px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={center} pathOptions={fillBlueOptions} radius={100000}>
        <Tooltip >
            100km radius circle
          </Tooltip>
        </Circle>
        <Circle center={center} pathOptions={fillBlueOptions} radius={30000}>
        <Tooltip >
            30km radius circle
          </Tooltip>
        </Circle>
        <Circle center={center} pathOptions={fillBlueOptions} radius={10000}>
        <Tooltip >
            10km radius circle
          </Tooltip>
        </Circle>
        <Circle center={center} pathOptions={fillBlueOptions} radius={5000}>
          <Tooltip >
            5km radius circle
          </Tooltip>
        </Circle>
        
        
      </MapContainer>
    </div>
  );
}
