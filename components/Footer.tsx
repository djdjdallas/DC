import { Logo } from "./Nav";

const colStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  fontSize: 12,
};

const colTitle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "#F2F2F0",
  marginBottom: 4,
};

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid #1E1E1E" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 32px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Logo size={28} />
              <span className="font-bebas" style={{ fontSize: 22, letterSpacing: 1 }}>
                DIRECT<span style={{ color: "#E11414" }}>CUTS</span>
              </span>
            </div>
            <p
              style={{
                margin: 0,
                color: "#9C9C9C",
                fontSize: 12,
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              The on-demand barber marketplace connecting customers and barbers
              anywhere, anytime.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              <a className="muted-link" href="#top">IG</a>
              <a className="muted-link" href="#top">TIKTOK</a>
              <a className="muted-link" href="#top">X</a>
              <a className="muted-link" href="#top">YT</a>
              <a className="muted-link" href="#top">LI</a>
            </div>
          </div>
          <div style={colStyle}>
            <div style={colTitle}>COMPANY</div>
            <a className="muted-link" href="#top">Home</a>
            <a className="muted-link" href="#platform">Platform</a>
            <a className="muted-link" href="#leadership">Leadership</a>
            <a className="muted-link" href="#contact">Contact</a>
          </div>
          <div style={colStyle}>
            <div style={colTitle}>INVESTORS</div>
            <a className="muted-link" href="#investors">Investment Opportunity</a>
            <a className="muted-link" href="#contact">Request Access</a>
            <a className="muted-link" href="#contact">Use of Funds</a>
            <a className="muted-link" href="#contact">Investor FAQ</a>
          </div>
          <div style={colStyle}>
            <div style={colTitle}>GET IN TOUCH</div>
            <a className="muted-link" href="mailto:investors@directcuts.com">
              investors@directcuts.com
            </a>
            <a className="muted-link" href="mailto:partners@directcuts.com">
              partners@directcuts.com
            </a>
            <span style={{ color: "#9C9C9C" }}>Las Vegas, Nevada</span>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #1E1E1E",
            marginTop: 40,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 11,
            color: "#6E6E6E",
          }}
        >
          <span>© 2026 DirectCuts. All rights reserved.</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a className="faint-link" href="#top">Privacy Policy</a>
            <a className="faint-link" href="#top">Terms of Service</a>
            <a className="faint-link" href="#top">Disclosures</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
