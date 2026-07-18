function Logo({ size = 30 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-mark.png"
      alt=""
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}

export { Logo };

export default function Nav() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(8,8,8,0.94)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1E1E1E",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span
            className="font-bebas"
            style={{ fontSize: 24, letterSpacing: 1 }}
          >
            DIRECT<span style={{ color: "#E11414" }}>CUTS</span>
          </span>
        </a>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
          }}
        >
          <a href="#platform">PLATFORM</a>
          <a href="#investors">INVESTORS</a>
          <a href="#leadership">LEADERSHIP</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a
          href="#contact"
          className="btn-red"
          style={{
            background: "#E11414",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "12px 20px",
            borderRadius: 4,
          }}
        >
          REQUEST INVESTOR ACCESS
        </a>
      </div>
    </div>
  );
}
