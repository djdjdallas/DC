import SectionHeading from "./SectionHeading";
import { features } from "@/lib/data";

export default function Features() {
  return (
    <section
      id="platform"
      style={{ background: "#0A0A0A", borderTop: "1px solid #1E1E1E" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px" }}>
        <SectionHeading size={34} marginBottom={16}>
          POWERFUL <span style={{ color: "#E11414" }}>FEATURES.</span> ENDLESS
          POSSIBILITIES.
        </SectionHeading>
        <p
          style={{
            margin: "0 auto 48px",
            maxWidth: 560,
            textAlign: "center",
            color: "#9C9C9C",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          The all-in-one platform connecting customers with professional barbers
          — on-demand mobile cuts, in-shop appointments, and premium after-hours
          services.
        </p>
        <div
          data-stagger
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover"
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 10,
                padding: "26px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span
                className="font-bebas"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1.5px solid #E11414",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  color: "#E11414",
                }}
              >
                {f.glyph}
              </span>
              <div className="font-bebas" style={{ fontSize: 22, letterSpacing: 1 }}>
                {f.title}
              </div>
              <div style={{ color: "#9C9C9C", fontSize: 13, lineHeight: 1.65 }}>
                {f.copy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
