import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

export default function MapTest() {

  const center: LatLngTuple = [51.505, -0.09]
  const fillBlueOptions = { fillColor: 'blue' }

  
  return (
    <div>
      <MapContainer
        className="leaflet-container"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '600px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Circle center={center} pathOptions={fillBlueOptions} radius={5000} />
        <Circle center={center} pathOptions={fillBlueOptions} radius={10000} />
        <Circle center={center} pathOptions={fillBlueOptions} radius={30000} />
        <Circle center={center} pathOptions={fillBlueOptions} radius={100000} />
      </MapContainer>
    </div>
  );
}
