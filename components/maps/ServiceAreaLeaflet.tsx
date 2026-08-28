"use client";

import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

import { business } from "@/data/business";

type City = {
  name: string;
  coordinates: [number, number];
  home?: boolean;
};

const houston: [number, number] = [29.7604, -95.3698];

const cities: City[] = [
  { name: "Houston", coordinates: houston, home: true },
  { name: "Katy", coordinates: [29.7858, -95.8245] },
  { name: "Sugar Land", coordinates: [29.6197, -95.6349] },
  { name: "Cypress", coordinates: [29.9691, -95.6972] },
  { name: "Spring", coordinates: [30.0799, -95.4172] },
  { name: "Tomball", coordinates: [30.0972, -95.6161] },
  { name: "Humble", coordinates: [29.9988, -95.2622] },
  { name: "Conroe", coordinates: [30.3119, -95.4561] },
  { name: "Alvin", coordinates: [29.4238, -95.2441] },
  { name: "League City", coordinates: [29.5075, -95.0949] },
];

export function ServiceAreaLeaflet() {
  return (
    /*
      isolation + overflow keep Leaflet's high pane z-indexes inside this box
      so the map cannot paint over the fixed site header while scrolling.
    */
    <div className="glass-service-map relative isolate z-0 h-[23rem] overflow-hidden border border-charcoal/15 bg-[#e8f2f2] sm:h-[29rem]">
      <MapContainer
        center={houston}
        zoom={9}
        minZoom={8}
        maxZoom={14}
        scrollWheelZoom={false}
        className="size-full !z-0"
        aria-label="Interactive map showing Martinez Orlyn Glass & Mirror coverage around Houston, Texas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={houston}
          radius={Math.round(business.radiusMiles * 1609.34)}
          pathOptions={{ color: "#14c4c4", fillColor: "#14c4c4", fillOpacity: 0.1, weight: 2 }}
        />
        {cities.map((city) => (
          <CircleMarker
            key={city.name}
            center={city.coordinates}
            radius={city.home ? 9 : 6}
            pathOptions={{
              color: "#f4f8f9",
              fillColor: city.home ? "#14c4c4" : "#0a1218",
              fillOpacity: 1,
              weight: 2,
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -7]} opacity={1}>
              {city.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      <p className="pointer-events-none absolute bottom-4 left-4 z-[1] bg-charcoal px-3 py-2 font-display text-[0.65rem] font-bold tracking-[0.12em] text-bone uppercase">
        Houston home base · glass &amp; mirror service area
      </p>
    </div>
  );
}
