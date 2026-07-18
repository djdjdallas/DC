import TourMap from "./TourMap";

const tourStats = [
  { value: "48", label: "STATES" },
  { value: "100", label: "DAYS" },
  { value: "1", label: "MOVEMENT" },
];

export default function Tour() {
  return (
    <section style={{ background: "#000", borderTop: "1px solid #1E1E1E" }}>
      <div
        className="section-pad"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "88px 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div
          data-tour-map
          className="tour-map-box"
          style={{
            flex: "1 1 420px",
            position: "relative",
            height: 400,
            border: "1px solid #222",
            borderRadius: 10,
            overflow: "hidden",
            background: "#0A0A0A",
            padding: 16,
          }}
        >
          <TourMap />
        </div>
        <div
          data-reveal
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <h2
            className="font-bebas"
            style={{
              margin: 0,
              fontSize: "clamp(40px, 4vw, 54px)",
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            THE 48-STATE
            <br />
            <span style={{ color: "#E11414" }}>100-DAY TOUR</span>
          </h2>
          <p
            style={{
              margin: 0,
              color: "#C9C9C4",
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 460,
            }}
          >
            We&apos;re hitting the road to meet barbers, customers, sponsors,
            and communities across America. This isn&apos;t just a tour.
            It&apos;s a movement.
          </p>
          <div
            data-stagger
            style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 6 }}
          >
            {tourStats.map((s) => (
              <div key={s.label}>
                <span className="font-bebas" style={{ fontSize: 34, color: "#E11414" }}>
                  {s.value}
                </span>{" "}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "#9C9C9C",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
