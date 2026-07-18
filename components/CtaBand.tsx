export default function CtaBand() {
  return (
    <section style={{ background: "#0A0A0A", padding: "0 32px" }}>
      <div
        data-reveal
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          border: "1px solid #6B0A0A",
          borderRadius: 12,
          background: "linear-gradient(90deg, #150404, #0A0A0A 55%)",
          padding: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <h2
          className="font-bebas"
          style={{
            margin: 0,
            fontSize: "clamp(36px, 4vw, 52px)",
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          THE FUTURE IS OURS TO BUILD.
          <br />
          <span style={{ color: "#E11414" }}>JOIN US.</span>
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 340,
          }}
        >
          <p style={{ margin: 0, color: "#C9C9C4", fontSize: 14, lineHeight: 1.6 }}>
            Be part of the movement that&apos;s reshaping an industry and
            creating generational impact.
          </p>
          <a
            href="#contact"
            className="btn-red"
            style={{
              background: "#E11414",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "14px 24px",
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            REQUEST INVESTOR ACCESS
          </a>
        </div>
      </div>
    </section>
  );
}
