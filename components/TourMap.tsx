import { geoAlbers, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import statesTopo from "us-atlas/states-10m.json";
import TourRoute from "./TourRoute";

// Alaska, Hawaii, and territories — the tour covers the lower 48
const EXCLUDED_FIPS = new Set(["02", "15", "60", "66", "69", "72", "78"]);

// Tour stops remain placeholder data pending the real itinerary.
// One city per lower-48 state (plus DC), looping out of Las Vegas HQ.
// First and last entries are Las Vegas (the route is a loop).
// major: persistent label on the map; others label only while the bus visits.
// labelDx/labelDy/anchor nudge each city label clear of pins and edges.
const TOUR_STOPS: {
  name: string;
  coords: [number, number];
  major?: boolean;
  labelDx?: number;
  labelDy?: number;
  anchor?: "start" | "middle" | "end";
}[] = [
  { name: "Las Vegas", coords: [-115.14, 36.17] },
  { name: "Los Angeles", coords: [-118.24, 34.05], major: true, labelDx: -4, labelDy: 18 },
  { name: "Phoenix", coords: [-112.07, 33.45], labelDy: 18 },
  { name: "Albuquerque", coords: [-106.65, 35.08], labelDy: -10 },
  { name: "Houston", coords: [-95.37, 29.76], major: true, labelDy: 20 },
  { name: "New Orleans", coords: [-90.07, 29.95], labelDy: 18 },
  { name: "Jackson", coords: [-90.18, 32.3], labelDy: -10 },
  { name: "Birmingham", coords: [-86.8, 33.52], labelDy: -10 },
  { name: "Miami", coords: [-80.19, 25.76], major: true, labelDx: 10, labelDy: 2, anchor: "start" },
  { name: "Atlanta", coords: [-84.39, 33.75], major: true, labelDx: 10, labelDy: -6, anchor: "start" },
  { name: "Columbia", coords: [-81.03, 34.0], labelDx: 8, labelDy: 10, anchor: "start" },
  { name: "Charlotte", coords: [-80.84, 35.23], labelDx: 8, labelDy: -6, anchor: "start" },
  { name: "Richmond", coords: [-77.44, 37.54], labelDx: 8, labelDy: 8, anchor: "start" },
  { name: "Washington DC", coords: [-77.04, 38.9], major: true, labelDx: 10, labelDy: 10, anchor: "start" },
  { name: "Baltimore", coords: [-76.61, 39.29], labelDx: 8, labelDy: 4, anchor: "start" },
  { name: "Wilmington", coords: [-75.55, 39.75], labelDx: 8, labelDy: 8, anchor: "start" },
  { name: "Philadelphia", coords: [-75.17, 39.95], labelDx: 8, labelDy: 2, anchor: "start" },
  { name: "Newark", coords: [-74.17, 40.74], labelDx: 8, labelDy: 6, anchor: "start" },
  { name: "New York", coords: [-74.01, 40.71], major: true, labelDx: 10, labelDy: -4, anchor: "start" },
  { name: "Hartford", coords: [-72.69, 41.77], labelDx: 8, labelDy: -4, anchor: "start" },
  { name: "Providence", coords: [-71.41, 41.82], labelDx: -8, labelDy: 8, anchor: "end" },
  { name: "Boston", coords: [-71.06, 42.36], labelDx: 8, labelDy: -2, anchor: "start" },
  { name: "Manchester", coords: [-71.46, 42.99], labelDx: -8, labelDy: -4, anchor: "end" },
  { name: "Portland", coords: [-70.26, 43.66], labelDx: -8, labelDy: -6, anchor: "end" },
  { name: "Burlington", coords: [-73.21, 44.48], labelDy: -10 },
  { name: "Cleveland", coords: [-81.69, 41.5], labelDy: -10 },
  { name: "Detroit", coords: [-83.05, 42.33], labelDy: -10 },
  { name: "Indianapolis", coords: [-86.16, 39.77], labelDy: -10 },
  { name: "Louisville", coords: [-85.76, 38.25], labelDy: 16 },
  { name: "Charleston", coords: [-81.63, 38.35], labelDx: 8, labelDy: 6, anchor: "start" },
  { name: "Nashville", coords: [-86.78, 36.16], labelDy: 16 },
  { name: "Little Rock", coords: [-92.29, 34.75], labelDy: 16 },
  { name: "St. Louis", coords: [-90.2, 38.63], labelDy: -10 },
  { name: "Chicago", coords: [-87.63, 41.88], major: true, labelDy: -10 },
  { name: "Milwaukee", coords: [-87.91, 43.04], labelDx: -8, labelDy: -4, anchor: "end" },
  { name: "Minneapolis", coords: [-93.27, 44.98], labelDy: -10 },
  { name: "Des Moines", coords: [-93.61, 41.59], labelDy: 16 },
  { name: "Omaha", coords: [-95.93, 41.26], labelDy: -10 },
  { name: "Wichita", coords: [-97.34, 37.69], labelDy: 16 },
  { name: "Oklahoma City", coords: [-97.52, 35.47], labelDy: -10 },
  { name: "Denver", coords: [-104.99, 39.74], major: true, labelDy: -10 },
  { name: "Cheyenne", coords: [-104.82, 41.14], labelDx: 8, labelDy: -6, anchor: "start" },
  { name: "Rapid City", coords: [-103.23, 44.08], labelDy: -10 },
  { name: "Fargo", coords: [-96.79, 46.88], labelDy: -10 },
  { name: "Billings", coords: [-108.5, 45.78], labelDy: -10 },
  { name: "Boise", coords: [-116.2, 43.62], labelDy: -10 },
  { name: "Seattle", coords: [-122.33, 47.61], major: true, labelDx: 8, labelDy: 14, anchor: "start" },
  { name: "Portland", coords: [-122.68, 45.52], labelDx: 8, labelDy: 6, anchor: "start" },
  { name: "Salt Lake City", coords: [-111.89, 40.76], labelDy: 16 },
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
      major: s.major ?? false,
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
