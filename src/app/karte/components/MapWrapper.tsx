"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { Marker as LeafletMarker } from "leaflet";
import Link from "next/link";
import { useEffect, useRef } from "react";

// --- Marker Type ---
export type MapMarker = {
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

function RemoveLeafletPrefix() {
  const map = useMap();

  useEffect(() => {
    map.attributionControl.setPrefix(false);
  }, [map]);

  return null;
}

// --- FocusMarker Component ---
function FocusMarker({
  markers,
  focusId,
}: {
  markers: MapMarker[];
  focusId?: string;
}) {
  const map = useMap();
  const markerRefs = useRef<Record<string, LeafletMarker>>(Object.create(null));

  useEffect(() => {
    if (!focusId) return;

    const target = markers.find((m) => String(m.id) === focusId);
    if (!target?.lat || !target?.lng) return;

    // Zoom auf den Marker
    map.setView([target.lat, target.lng], 16);

    // Popup öffnen
    const marker = markerRefs.current[focusId];
    if (marker && marker.getPopup()) {
      marker.openPopup();
    }
  }, [focusId, map, markers]);

  return (
    <>
      {markers
        .filter((m) => m.lat != null && m.lng != null)
        .map((m) => (
          <Marker
            key={`focus-${m.id}`}
            position={[m.lat!, m.lng!]}
            ref={(ref) => {
              if (ref) markerRefs.current[String(m.id)] = ref;
            }}
          >
            {m.label && (
              <Popup>
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

// --- Main MapWrapper Component ---
export default function MapWrapper({ markers, focusId }: MapProps) {
  useEffect(() => {
    // Fix Leaflet Icons in Next.js
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
      attributionControl={true}
      className="relative w-full h-96 lg:h-120"
    >
      <RemoveLeafletPrefix />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />

      {/* MarkerCluster mit Spiderfy */}
      <MarkerClusterGroup spiderfyOnMaxZoom maxClusterRadius={20}>
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

      {/* Fokus auf Marker per URL / focusId */}
      {focusId && <FocusMarker markers={markers} focusId={focusId} />}
    </MapContainer>
  );
}
