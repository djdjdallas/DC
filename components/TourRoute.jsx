"use client";

import { useEffect, useMemo, useRef } from "react";

// Timing — tune the whole journey from here.
// 49 legs at (travel + dwell) ≈ 50s per lap.
const TRAVEL_DURATION = 0.65; // seconds of travel per leg
const DWELL_DURATION = 0.35; // seconds parked at each stop
const LOOP_PAUSE = 3; // seconds parked at HQ before the journey replays
// a minor stop's label stays visible while the bus covers this many
// onward legs (~1s each), then fades — instead of vanishing on departure
const LABEL_LINGER_STOPS = 3;
const MOBILE_QUERY = "(max-width: 640px)";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Route + stops + labels + bus, animated with vanilla requestAnimationFrame.
 * `stops` arrive projected from the server component:
 *   { name, x, y, labelDx, labelDy, anchor } — first and last are Las Vegas HQ.
 */
export default function TourRoute({ stops }) {
  const routeRef = useRef(null);
  const busRef = useRef(null);
  const groupRef = useRef(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  const { routeD, legLens, cumLens } = useMemo(() => {
    const d = stops
      .map((s, i) => `${i === 0 ? "M" : "L"}${s.x},${s.y}`)
      .join(" ");
    const legs = [];
    const cums = [0];
    for (let i = 1; i < stops.length; i++) {
      const len = Math.hypot(stops[i].x - stops[i - 1].x, stops[i].y - stops[i - 1].y);
      legs.push(len);
      cums.push(cums[i - 1] + len);
    }
    return { routeD: d, legLens: legs, cumLens: cums };
  }, [stops]);

  useEffect(() => {
    const route = routeRef.current;
    const bus = busRef.current;
    const group = groupRef.current;
    if (!route || !bus || !group) return;

    const total = route.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;

    const pins = group.querySelectorAll("[data-stop-pin]");
    const rings = group.querySelectorAll("[data-stop-ring]");
    const labels = group.querySelectorAll("[data-stop-label]");

    const setBus = (len) => {
      const p = route.getPointAtLength(len);
      const ahead = route.getPointAtLength(Math.min(len + 2, total));
      const behind = route.getPointAtLength(Math.max(len - 2, 0));
      const angle =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      // heading left would put the wheels on top — mirror instead
      const flip = angle > 90 || angle < -90 ? " scale(1,-1)" : "";
      bus.setAttribute(
        "transform",
        `translate(${p.x}, ${p.y}) rotate(${angle})${flip}`
      );
    };

    // stopIndex is the index into `stops`; pins/labels are keyed by it too.
    const arriveAt = (stopIndex) => {
      const pin = group.querySelector(`[data-stop-pin="${stopIndex}"]`);
      const ring = group.querySelector(`[data-stop-ring="${stopIndex}"]`);
      const label = group.querySelector(`[data-stop-label="${stopIndex}"]`);
      if (pin) pin.classList.add("visited");
      if (ring) {
        ring.classList.remove("pulse");
        // force a reflow so the one-shot pulse animation restarts
        void ring.getBoundingClientRect();
        ring.classList.add("pulse");
      }
      if (label) label.classList.add("shown");
    };

    const showEndState = () => {
      route.style.strokeDasharray = "none";
      route.style.strokeDashoffset = "0";
      pins.forEach((p) => p.classList.add("visited"));
      // only major-stop labels persist; transient ones would clutter the map
      if (!isMobile)
        labels.forEach((l) => {
          if (!l.dataset.transient) l.classList.add("shown");
        });
      setBus(total);
    };

    if (reduced) {
      showEndState();
      return;
    }

    // initial state: nothing traveled, bus parked at HQ
    route.style.strokeDasharray = `${total}`;
    route.style.strokeDashoffset = `${total}`;
    setBus(0);

    // clear the trail, pins, and labels so the journey can replay
    const resetJourney = () => {
      route.style.strokeDashoffset = `${total}`;
      pins.forEach((p, i) => {
        if (i !== 0) p.classList.remove("visited");
      });
      rings.forEach((r) => r.classList.remove("pulse"));
      labels.forEach((l) => l.classList.remove("shown"));
      setBus(0);
    };

    let legIndex = 0;
    let phase = "travel";
    let phaseStart = null;

    const frame = (ts) => {
      if (phaseStart === null) phaseStart = ts;
      const elapsed = (ts - phaseStart) / 1000;

      if (phase === "travel") {
        const t = Math.min(elapsed / TRAVEL_DURATION, 1);
        const len = cumLens[legIndex] + easeInOutCubic(t) * legLens[legIndex];
        route.style.strokeDashoffset = `${total - len}`;
        setBus(len);
        if (t >= 1) {
          arriveAt(legIndex + 1);
          phase = legIndex + 1 >= stops.length - 1 ? "complete" : "dwell";
          phaseStart = ts;
        }
      } else if (phase === "dwell") {
        if (elapsed >= DWELL_DURATION) {
          // fade the label the bus passed LABEL_LINGER_STOPS legs ago;
          // major-stop labels persist on desktop
          const lingered = group.querySelector(
            `[data-stop-label="${legIndex + 1 - LABEL_LINGER_STOPS}"]`
          );
          if (lingered && (isMobile || lingered.dataset.transient))
            lingered.classList.remove("shown");
          legIndex += 1;
          phase = "travel";
          phaseStart = ts;
        }
      } else if (elapsed >= LOOP_PAUSE) {
        // journey complete — rest at HQ, then run it again
        resetJourney();
        legIndex = 0;
        phase = "travel";
        phaseStart = ts;
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    const start = () => {
      if (startedRef.current) return; // one rAF loop only — replays are internal
      startedRef.current = true;
      rafRef.current = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(route.ownerSVGElement);

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [stops, legLens, cumLens]);

  const origin = stops[0];
  // unique stops only — the last entry is the return to Las Vegas
  const uniqueStops = stops.slice(0, -1);

  return (
    <g ref={groupRef}>
      {/* faint full-route underlay so the journey ahead is visible */}
      <path
        d={routeD}
        fill="none"
        stroke="#2A2A2A"
        strokeWidth={1.2}
        strokeDasharray="3 5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* traveled route — trails behind the bus */}
      <path
        ref={routeRef}
        className="tour-route"
        d={routeD}
        fill="none"
        stroke="#E11414"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.9}
      />

      {uniqueStops.map((s, i) => (
        <g key={`${s.name}-${i}`}>
          <circle
            data-stop-ring={i}
            className="stop-ring"
            cx={s.x}
            cy={s.y}
            r={s.major ? 5 : 4}
            fill="none"
            stroke="#E11414"
            strokeWidth={1.2}
          />
          <circle
            data-stop-pin={i}
            className={`stop-pin${i === 0 ? " visited" : ""}`}
            cx={s.x}
            cy={s.y}
            r={s.major ? 3 : 2.2}
          >
            <title>{s.name}</title>
          </circle>
          {i > 0 && (
            <text
              data-stop-label={i}
              data-transient={s.major ? undefined : "1"}
              className="stop-label font-bebas"
              x={s.x + (s.labelDx ?? 0)}
              y={s.y + (s.labelDy ?? -10)}
              textAnchor={s.anchor ?? "middle"}
              fill={s.major ? "#C9C9C4" : "#9C9C9C"}
              fontSize={s.major ? 11 : 10}
              letterSpacing="0.12em"
            >
              {s.name.toUpperCase()}
            </text>
          )}
        </g>
      ))}

      {/* origin keeps its distinct HQ treatment */}
      <g>
        <circle
          cx={origin.x}
          cy={origin.y}
          r={6.5}
          fill="none"
          stroke="#F2F2F0"
          strokeWidth={1.2}
        />
        <text
          x={origin.x}
          y={origin.y + 22}
          textAnchor="middle"
          fill="#9C9C9C"
          fontSize={11}
          fontWeight={600}
          letterSpacing="0.08em"
        >
          LAS VEGAS HQ
        </text>
      </g>

      {/* tour bus — positioned by getPointAtLength in the rAF loop */}
      <g
        ref={busRef}
        id="tour-bus"
        transform={`translate(${origin.x}, ${origin.y})`}
        style={{ filter: "drop-shadow(0 0 6px rgba(225,20,20,0.65))" }}
      >
        <title>DirectCuts tour bus</title>
        <rect x={-11} y={-6} width={22} height={11} rx={2.5} fill="#E11414" stroke="#0A0A0A" strokeWidth={0.8} />
        <rect x={6} y={-4} width={4} height={4.5} rx={1} fill="#F2F2F0" opacity={0.9} />
        <rect x={-8.5} y={-4} width={3.5} height={3.5} rx={0.8} fill="#F2F2F0" opacity={0.75} />
        <rect x={-3.5} y={-4} width={3.5} height={3.5} rx={0.8} fill="#F2F2F0" opacity={0.75} />
        <rect x={1.5} y={-4} width={3} height={3.5} rx={0.8} fill="#F2F2F0" opacity={0.75} />
        <circle cx={-6} cy={5.5} r={2.4} fill="#0A0A0A" stroke="#3A3A3A" strokeWidth={0.8} />
        <circle cx={6} cy={5.5} r={2.4} fill="#0A0A0A" stroke="#3A3A3A" strokeWidth={0.8} />
      </g>
    </g>
  );
}
