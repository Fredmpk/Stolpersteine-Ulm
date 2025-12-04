"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Link from "next/link";

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapMarker = {
  id: string | number;
  lat: number | undefined;
  lng: number | undefined;
  label: string | null;
  biotext_short: string | null;
  slug: string | null;
};

type MapProps = {
  markers: MapMarker[];
};

export default function Map({ markers }: MapProps) {
  return (
    <MapContainer
      center={[48.4011, 9.9876]}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat!, m.lng!]}>
          {m.label && (
            <Popup>
              <h1>{m.label}</h1>
              <p>{m.biotext_short}</p>
              <Link href={`/biografien/${m.slug!}`}>gesamte Biographie</Link>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
