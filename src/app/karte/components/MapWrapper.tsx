"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import L, { Marker as LeafletMarker } from "leaflet";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

function FocusMarker({
  markers,
  focusId,
}: {
  markers: MapMarker[];
  focusId?: string;
}) {
  const map = useMap();
  const markerRefs = useRef<Record<string, LeafletMarker>>({});

  useEffect(() => {
    if (!focusId) return;
    const target = markers.find((m) => String(m.id) === focusId);
    if (!target?.lat || !target?.lng) return;

    map.setView([target.lat, target.lng], 16);
    markerRefs.current[focusId]?.openPopup();
  }, [focusId, map, markers]);

  return (
    <>
      {markers
        .filter((m) => m.lat != null && m.lng != null)
        .map((m) => (
          <Marker
            key={m.id}
            position={[m.lat!, m.lng!]}
            ref={(ref) => {
              if (ref) markerRefs.current[String(m.id)] = ref;
            }}
          >
            {m.label && (
              <Popup className="w-54 sm:w-64">
                <h1>{m.label}</h1>
                <p>{m.biotext_short}</p>
                <Link href={`/biografien/${m.slug!}`}>gesamte Biographie</Link>
              </Popup>
            )}
          </Marker>
        ))}
    </>
  );
}

export default function Map({ markers, focusId }: MapProps) {
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

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <MapContainer
      center={[48.4011, 9.9876]}
      zoom={12}
      scrollWheelZoom={true}
      className="relative w-full h-96 lg:h-120"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <FocusMarker markers={markers} focusId={focusId} />
    </MapContainer>
  );
}
