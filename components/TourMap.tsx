import { geoAlbers, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import statesTopo from "us-atlas/states-10m.json";
import TourRoute from "./TourRoute";

// Alaska, Hawaii, and territories — the tour covers the lower 48
const EXCLUDED_FIPS = new Set(["02", "15", "60", "66", "69", "72", "78"]);

// Tour stops remain placeholder data pending the real itinerary.
// First and last entries are Las Vegas HQ (the route is a loop).
// labelDx/labelDy/anchor nudge each city label clear of pins and edges.
const TOUR_STOPS: {
  name: string;
  coords: [number, number];
  labelDx?: number;
  labelDy?: number;
  anchor?: "start" | "middle" | "end";
}[] = [
  { name: "Las Vegas", coords: [-115.14, 36.17] },
  { name: "Los Angeles", coords: [-118.24, 34.05], labelDx: -4, labelDy: 18 },
  { name: "Dallas", coords: [-96.8, 32.78], labelDy: -10 },
  { name: "Houston", coords: [-95.37, 29.76], labelDy: 20 },
  { name: "Atlanta", coords: [-84.39, 33.75], labelDx: 10, labelDy: -6, anchor: "start" },
  { name: "Miami", coords: [-80.19, 25.76], labelDx: 10, labelDy: 2, anchor: "start" },
  { name: "Washington DC", coords: [-77.04, 38.9], labelDx: 10, labelDy: 10, anchor: "start" },
  { name: "New York", coords: [-74.01, 40.71], labelDx: 10, labelDy: -4, anchor: "start" },
  { name: "Chicago", coords: [-87.63, 41.88], labelDy: -10 },
  { name: "Denver", coords: [-104.99, 39.74], labelDy: -10 },
  { name: "Las Vegas", coords: [-115.14, 36.17] },
];

const WIDTH = 800;
const HEIGHT = 500;

export default function TourMap() {
  const topo = statesTopo as unknown as Topology<{
    states: GeometryCollection<{ name: string }>;
  }>;
  const allStates = feature(topo, topo.objects.states);
  const lower48 = {
    type: "FeatureCollection" as const,
    features: allStates.features.filter(
      (f) => !EXCLUDED_FIPS.has(String(f.id))
    ),
  };

  const projection = geoAlbers().fitExtent(
    [
      [10, 10],
      [WIDTH - 10, HEIGHT - 10],
    ],
    lower48
  );
  const path = geoPath(projection);

  const stops = TOUR_STOPS.map((s) => {
    const [x, y] = projection(s.coords)!;
    return {
      name: s.name,
      x,
      y,
      labelDx: s.labelDx,
      labelDy: s.labelDy,
      anchor: s.anchor,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Map of the lower 48 United States showing the DirectCuts 100-day tour route"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <g>
        {lower48.features.map((f) => (
          <path
            key={String(f.id)}
            d={path(f) ?? undefined}
            fill="#111111"
            stroke="#2A2A2A"
            strokeWidth={0.8}
          >
            <title>{f.properties?.name}</title>
          </path>
        ))}
      </g>
      <TourRoute stops={stops} />
    </svg>
  );
}
