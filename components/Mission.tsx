import { appBarbers } from "@/lib/data";
import { PhoneFrame, BookNowButton } from "./PhoneFrame";

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
        className="section-pad"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: 64,
          alignItems: "center",
          justifyContent: "center",
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

        {/* three-phone lineup: Find a Barber / Book Anywhere (front) / After Dark */}
        <div
          data-phone
          style={{
            flex: "0 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* left: FIND A BARBER */}
          <PhoneFrame
            width={186}
            height={392}
            className="phone-side"
            style={{
              transform: "perspective(1000px) rotateY(16deg) translateY(18px)",
              marginRight: -26,
              zIndex: 1,
            }}
          >
            <div className="font-bebas" style={{ fontSize: 18, letterSpacing: 1, lineHeight: 1 }}>
              FIND A<br />BARBER
            </div>
            <div
              style={{
                height: 26,
                border: "1px solid #262626",
                borderRadius: 6,
                background: "#111",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                color: "#6E6E6E",
                fontSize: 9,
              }}
            >
              Search barbers
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {appBarbers.map((b) => (
                <div
                  key={b.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#111",
                    border: "1px solid #1E1E1E",
                    borderRadius: 7,
                    padding: "6px 8px",
                  }}
                >
                  <span
                    className="font-bebas"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2A0505, #4A0A0A)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "#F2F2F0",
                      flexShrink: 0,
                    }}
                  >
                    {b.initials}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 9, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {b.name}
                    </span>
                    <span style={{ display: "block", fontSize: 8, color: "#9C9C9C" }}>
                      {b.meta}
                    </span>
                  </span>
                  <span style={{ color: "#E11414", fontSize: 8, fontWeight: 700 }}>
                    ★ {b.rating}
                  </span>
                </div>
              ))}
            </div>
          </PhoneFrame>

          {/* center: BOOK ANYWHERE (front) */}
          <PhoneFrame width={228} height={470} style={{ zIndex: 2 }}>
            <div className="font-bebas" style={{ fontSize: 24, letterSpacing: 1, lineHeight: 0.95 }}>
              BOOK<br />ANYWHERE
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 8,
                border: "1px solid #1E1E1E",
                position: "relative",
                overflow: "hidden",
                background:
                  // stylized dark street map
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 34px, #1C1C1C 34px, #1C1C1C 36px)," +
                  "repeating-linear-gradient(90deg, transparent 0px, transparent 44px, #1C1C1C 44px, #1C1C1C 46px)," +
                  "linear-gradient(120deg, #141414 0%, #101010 60%, #161010 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "30%",
                  width: 3,
                  height: "100%",
                  background: "#222",
                  transform: "rotate(18deg)",
                }}
              />
              {/* map pin */}
              <div
                style={{
                  position: "absolute",
                  top: "42%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 22,
                    height: 22,
                    background: "#E11414",
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    boxShadow: "0 0 14px rgba(225,20,20,0.55)",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 6,
                      borderRadius: "50%",
                      background: "#0A0A0A",
                    }}
                  />
                </span>
              </div>
            </div>
            <BookNowButton />
          </PhoneFrame>

          {/* right: AFTER DARK */}
          <PhoneFrame
            width={186}
            height={392}
            className="phone-side"
            style={{
              transform: "perspective(1000px) rotateY(-16deg) translateY(18px)",
              marginLeft: -26,
              zIndex: 1,
            }}
          >
            <div className="font-bebas" style={{ fontSize: 18, letterSpacing: 1, lineHeight: 1 }}>
              AFTER <span style={{ color: "#E11414" }}>DARK</span>
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "#9C9C9C",
                lineHeight: 1.5,
              }}
            >
              PREMIUM AFTER HOURS
              <br />
              APPOINTMENTS
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 8,
                border: "1px solid #1E1E1E",
                background:
                  "radial-gradient(circle at 50% 30%, #241010 0%, #120808 55%, #0A0606 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="font-bebas"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  border: "1.5px solid #E11414",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  color: "#E11414",
                }}
              >
                ☾
              </span>
            </div>
            <BookNowButton fontSize={10} />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
