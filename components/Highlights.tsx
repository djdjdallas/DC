import SectionHeading from "./SectionHeading";
import { highlights } from "@/lib/data";

export default function Highlights() {
  return (
    <section
      id="investors"
      style={{ background: "#0A0A0A", borderTop: "1px solid #1E1E1E" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px" }}>
        <SectionHeading>
          INVESTMENT <span style={{ color: "#E11414" }}>HIGHLIGHTS</span>
        </SectionHeading>
        <div
          data-stagger
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px 0",
            justifyContent: "center",
          }}
        >
          {highlights.map((h) => (
            <div
              key={h.stat}
              style={{
                flex: "1 1 180px",
                maxWidth: 320,
                padding: "8px 20px",
                textAlign: "center",
                borderLeft: "1px solid #222",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                className="font-bebas"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1.5px solid #3A3A3A",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  color: "#E11414",
                }}
              >
                {h.glyph}
              </span>
              <div
                className="font-bebas"
                style={{ fontSize: 26, lineHeight: 1, color: h.color }}
              >
                {h.stat}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "#9C9C9C",
                  textTransform: "uppercase",
                }}
              >
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
