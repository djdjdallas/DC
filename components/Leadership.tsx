import SectionHeading from "./SectionHeading";
import ImageSlot from "./ImageSlot";
import { team } from "@/lib/data";

export default function Leadership() {
  const hasAllPhotos = team.every((t) => t.photo);
  return (
    <section
      id="leadership"
      style={{ background: "#0A0A0A", borderTop: "1px solid #1E1E1E" }}
    >
      <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px" }}>
        <SectionHeading size={34}>
          MEET THE <span style={{ color: "#E11414" }}>LEADERSHIP</span>
        </SectionHeading>
        <div
          data-stagger
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            justifyContent: "center",
          }}
        >
          {team.map((t) => (
            <div
              key={t.name}
              style={{
                flex: "1 1 200px",
                maxWidth: 280,
                background: "#111",
                border: "1px solid #222",
                borderRadius: 10,
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              {t.photo ? (
                <ImageSlot
                  src={t.photo}
                  alt={`${t.name} — ${t.role}`}
                  label={t.name}
                  style={{
                    height: 200,
                    width: "100%",
                    objectPosition: "center top",
                    borderBottom: "2px solid #E11414",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 200,
                    background:
                      "linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 60%, #2A0505 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "2px solid #E11414",
                  }}
                >
                  <span
                    className="font-bebas"
                    style={{ fontSize: 56, color: "#3D3D3D", letterSpacing: 2 }}
                  >
                    {t.initials}
                  </span>
                </div>
              )}
              <div style={{ padding: "18px 14px 22px" }}>
                <div className="font-bebas" style={{ fontSize: 22, letterSpacing: 1 }}>
                  {t.name}
                </div>
                <div
                  style={{
                    color: "#E11414",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    marginTop: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        {!hasAllPhotos && (
          <p
            style={{
              margin: "20px 0 0",
              textAlign: "center",
              color: "#6E6E6E",
              fontSize: 12,
            }}
          >
            [ Headshots pending — initials placeholders swap out when real
            photos arrive ]
          </p>
        )}
      </div>
    </section>
  );
}
