import { PhoneFrame, BookNowButton } from "./PhoneFrame";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { aiPreview } from "@/lib/data";

const steps = [
  {
    label: "Scan",
    icon: (
      // phone with scan line
      <g>
        <rect x="6" y="3" width="12" height="18" rx="2.5" />
        <line x1="4" y1="12" x2="20" y2="12" stroke="#E11414" />
      </g>
    ),
  },
  {
    label: "Preview",
    icon: (
      // viewfinder corners + face dot
      <g>
        <path d="M4 8 V5.5 A1.5 1.5 0 0 1 5.5 4 H8 M16 4 H18.5 A1.5 1.5 0 0 1 20 5.5 V8 M20 16 V18.5 A1.5 1.5 0 0 1 18.5 20 H16 M8 20 H5.5 A1.5 1.5 0 0 1 4 18.5 V16" />
        <circle cx="12" cy="12" r="3.5" />
      </g>
    ),
  },
  {
    label: "Customize",
    icon: (
      // sliders
      <g>
        <line x1="4" y1="8" x2="20" y2="8" />
        <circle cx="10" cy="8" r="2.2" fill="#0A0A0A" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <circle cx="15" cy="16" r="2.2" fill="#0A0A0A" />
      </g>
    ),
  },
  {
    label: "Book",
    icon: (
      // calendar with check
      <g>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
        <path d="M9 15.5 L11.5 18 L15.5 13.5" stroke="#E11414" />
      </g>
    ),
  },
];

// stylized wireframe head for the scan screen (placeholder until the
// AI-generated version from a real photo arrives)
function WireframeHead() {
  return (
    <svg
      viewBox="0 0 120 140"
      aria-hidden="true"
      style={{ width: "72%", height: "auto", display: "block", margin: "0 auto" }}
    >
      <defs>
        <clipPath id="headClip">
          <path d="M60 6 C 88 6 104 28 104 54 C 104 70 98 80 92 88 C 88 94 86 102 86 112 L 86 134 L 38 134 L 38 116 C 38 106 34 98 28 90 C 20 80 16 70 16 54 C 16 28 32 6 60 6 Z" />
        </clipPath>
      </defs>
      <path
        d="M60 6 C 88 6 104 28 104 54 C 104 70 98 80 92 88 C 88 94 86 102 86 112 L 86 134 L 38 134 L 38 116 C 38 106 34 98 28 90 C 20 80 16 70 16 54 C 16 28 32 6 60 6 Z"
        fill="#101010"
        stroke="#3A3A3A"
        strokeWidth="1"
      />
      <g clipPath="url(#headClip)" stroke="#2E2E2E" strokeWidth="0.7" fill="none">
        {/* latitude mesh */}
        {[20, 34, 48, 62, 76, 90, 104, 118].map((y) => (
          <path key={`lat-${y}`} d={`M10 ${y} Q 60 ${y + 10} 110 ${y}`} />
        ))}
        {/* longitude mesh */}
        {[28, 44, 60, 76, 92].map((x) => (
          <path key={`lon-${x}`} d={`M${x} 0 Q ${x > 60 ? x + 8 : x - 8} 70 ${x} 140`} />
        ))}
      </g>
      {/* red scan highlights */}
      <g clipPath="url(#headClip)">
        <path
          d="M10 48 Q 60 58 110 48"
          fill="none"
          stroke="#E11414"
          strokeWidth="1"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

export default function AiTechnology() {
  return (
    <section
      id="ai"
      style={{ background: "#000", borderTop: "1px solid #1E1E1E" }}
    >
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
        {/* copy + steps */}
        <div
          data-reveal
          style={{
            flex: "1 1 380px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2
            className="font-bebas"
            style={{
              margin: 0,
              fontSize: "clamp(38px, 4vw, 52px)",
              lineHeight: 1,
              letterSpacing: 1,
              fontWeight: 400,
            }}
          >
            <span style={{ color: "#E11414" }}>AI HAIRCUT</span> TECHNOLOGY
          </h2>
          <p
            style={{
              margin: 0,
              color: "#C9C9C4",
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 440,
            }}
          >
            Our AI scans your head shape, texture, and style preferences to
            show you the best haircuts before you book.
          </p>

          <div
            data-stagger
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    width: 64,
                  }}
                >
                  <span
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      border: "1px solid #2E2E2E",
                      background: "#111",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F2F2F0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </svg>
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "#C9C9C4",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    aria-hidden="true"
                    style={{ marginBottom: 22 }}
                  >
                    <path
                      d="M1 6 H14 M10 1.5 L15 6 L10 10.5"
                      fill="none"
                      stroke="#E11414"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <a
            href="#ai-preview"
            className="btn-outline"
            style={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid #3A3A3A",
              color: "#F2F2F0",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "14px 24px",
              borderRadius: 4,
              marginTop: 8,
            }}
          >
            SEE AI IN ACTION
          </a>
        </div>

        {/* scan phone */}
        <div
          data-reveal
          style={{ flex: "0 1 auto", display: "flex", justifyContent: "center" }}
        >
          <PhoneFrame width={228} height={470}>
            <div
              className="font-bebas"
              style={{ fontSize: 20, letterSpacing: 1, lineHeight: 1 }}
            >
              SCANNING<span style={{ color: "#E11414" }}>…</span>
            </div>
            <div
              className="scan-screen"
              style={{
                flex: 1,
                borderRadius: 8,
                border: "1px solid #1E1E1E",
                background:
                  "radial-gradient(circle at 50% 35%, #131313 0%, #0C0C0C 70%)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <WireframeHead />
              <div className="scan-line" />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Fade", "Waves", "Taper"].map((cut) => (
                <div
                  key={cut}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    borderRadius: 6,
                    border: "1px solid #262626",
                    background: "linear-gradient(160deg, #1A1A1A, #101010)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 4,
                    fontSize: 8,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "#9C9C9C",
                    textTransform: "uppercase",
                  }}
                >
                  {cut}
                </div>
              ))}
            </div>
            <BookNowButton label="CONFIRM & BOOK" fontSize={10} />
          </PhoneFrame>
        </div>

        {/* before/after slider */}
        <div
          id="ai-preview"
          data-reveal
          style={{
            flex: "1 1 300px",
            maxWidth: 380,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            margin: "0 auto",
          }}
        >
          <BeforeAfterSlider
            before={aiPreview.before}
            after={aiPreview.after}
            alt="Original portrait compared with an AI-generated haircut preview"
          />
          <div>
            <div
              className="font-bebas"
              style={{ fontSize: 24, letterSpacing: 1 }}
            >
              AI HAIRCUT <span style={{ color: "#E11414" }}>PREVIEW</span>
            </div>
            <p
              style={{
                margin: "6px 0 0",
                color: "#9C9C9C",
                fontSize: 13,
                lineHeight: 1.65,
              }}
            >
              Use AI technology to preview haircuts, beard styles, and lineups
              before you book. Drag the slider to compare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
