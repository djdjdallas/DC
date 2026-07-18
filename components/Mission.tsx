import { appBarbers } from "@/lib/data";

const stats = [
  { value: "$23B+", label: "U.S. BARBER INDUSTRY", color: "#E11414" },
  { value: "120K+", label: "BARBERS IN AMERICA", color: "#F2F2F0" },
  { value: "70%+", label: "MARKET STILL OFFLINE", color: "#F2F2F0" },
  { value: "10X", label: "GROWTH POTENTIAL", color: "#E11414" },
];

export default function Mission() {
  return (
    <section style={{ background: "#000", borderTop: "1px solid #1E1E1E" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div
          data-reveal
          style={{
            flex: "1 1 420px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            className="font-bebas"
            style={{ color: "#E11414", fontSize: 17, letterSpacing: "0.2em" }}
          >
            OUR MISSION
          </div>
          <h2
            className="font-bebas"
            style={{
              margin: 0,
              fontSize: "clamp(40px, 4.5vw, 60px)",
              lineHeight: 1,
              letterSpacing: 0.5,
              fontWeight: 400,
            }}
          >
            ELEVATE BARBERS.
            <br />
            EMPOWER COMMUNITIES.
            <br />
            <span style={{ color: "#E11414" }}>TRANSFORM AN INDUSTRY.</span>
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
            DirectCuts exists to empower barbers with better tools, more
            opportunities, and more customers — while giving people everywhere
            access to premium grooming experiences on their terms.
          </p>
          <div
            data-stagger
            style={{ display: "flex", flexWrap: "wrap", gap: 36, marginTop: 12 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="font-bebas"
                  style={{ fontSize: 40, color: s.color, lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "#9C9C9C",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "0 1 340px", display: "flex", justifyContent: "center" }}>
          <div
            data-phone
            style={{
              width: 260,
              height: 530,
              background: "#0E0E0E",
              border: "1px solid #2A2A2A",
              borderRadius: 36,
              padding: "14px 12px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 6px #050505",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 20,
                background: "#050505",
                borderRadius: 10,
              }}
            />
            <div
              style={{
                height: "100%",
                borderRadius: 24,
                background: "#0A0A0A",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "34px 14px 14px",
                gap: 12,
              }}
            >
              <div className="font-bebas" style={{ fontSize: 24, letterSpacing: 1 }}>
                FIND A BARBER
              </div>
              <div
                style={{
                  height: 32,
                  border: "1px solid #262626",
                  borderRadius: 6,
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  color: "#6E6E6E",
                  fontSize: 11,
                }}
              >
                Search by name or location
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {appBarbers.map((b) => (
                  <div
                    key={b.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "#111",
                      border: "1px solid #1E1E1E",
                      borderRadius: 8,
                      padding: "8px 10px",
                    }}
                  >
                    <span
                      className="font-bebas"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #2A0505, #4A0A0A)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        color: "#F2F2F0",
                      }}
                    >
                      {b.initials}
                    </span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 600 }}>
                        {b.name}
                      </span>
                      <span style={{ display: "block", fontSize: 10, color: "#9C9C9C" }}>
                        {b.meta}
                      </span>
                    </span>
                    <span style={{ color: "#E11414", fontSize: 10, fontWeight: 700 }}>
                      ★ {b.rating}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  background: "#E11414",
                  borderRadius: 6,
                  textAlign: "center",
                  padding: 11,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                BOOK NOW
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
