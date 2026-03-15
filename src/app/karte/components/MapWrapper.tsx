"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useEffect } from "react";
import Link from "next/link";

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
  focusId?: string;
};

export default function MapWrapper({ markers }: MapProps) {
  useEffect(() => {
    const DefaultIcon = L.Icon.Default.prototype as L.Icon.Default & {
      _getIconUrl?: string;
    };

    delete DefaultIcon._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[48.4011, 9.9876]}
      zoom={12}
      scrollWheelZoom
      className="relative w-full h-96 lg:h-120"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <MarkerClusterGroup spiderfyOnMaxZoom={true} maxClusterRadius={10}>
        {markers
          .filter((m) => m.lat != null && m.lng != null)
          .map((m) => (
            <Marker key={m.id} position={[m.lat!, m.lng!]}>
              {m.label && (
                <Popup>
                  <h1>{m.label}</h1>
                  <p>{m.biotext_short}</p>
                  <Link href={`/biografien/${m.slug!}`}>
                    gesamte Biographie
                  </Link>
                </Popup>
              )}
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
