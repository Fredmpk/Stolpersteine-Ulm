"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] flex items-center justify-center bg-gray-100">
      <p>Karte wird geladen...</p>
    </div>
  ),
});

type MapMarker = {
  id: string | number;
  lat: number | undefined;
  lng: number | undefined;
  label: string | null;
  biotext_short: string | null;
  slug: string | null;
};

type MapWrapperProps = {
  markers: MapMarker[];
};

export default function MapWrapper({ markers }: MapWrapperProps) {
  return <Map markers={markers} />;
}
