"use client";

import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#platform", label: "PLATFORM" },
  { href: "#investors", label: "INVESTORS" },
  { href: "#leadership", label: "LEADERSHIP" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
        className="nav-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Logo />
          <span className="font-bebas" style={{ fontSize: 24, letterSpacing: 1 }}>
            DIRECT<span style={{ color: "#E11414" }}>CUTS</span>
          </span>
        </a>
        <nav
          aria-label="Primary"
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
          }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#contact"
            className="btn-red nav-cta"
            onClick={() => setOpen(false)}
            style={{
              background: "#E11414",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "12px 20px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            REQUEST INVESTOR ACCESS
          </a>
          <button
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "none",
              border: "1px solid #3A3A3A",
              borderRadius: 4,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F2F2F0",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              {open ? (
                <g stroke="#F2F2F0" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="16" y2="12" />
                  <line x1="16" y1="2" x2="2" y2="12" />
                </g>
              ) : (
                <g stroke="#F2F2F0" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="2" x2="17" y2="2" />
                  <line x1="1" y1="7" x2="17" y2="7" />
                  <line x1="1" y1="12" x2="17" y2="12" />
                </g>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="nav-mobile"
          style={{
            borderTop: "1px solid #1E1E1E",
            background: "rgba(8,8,8,0.98)",
            padding: "8px 20px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "14px 4px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                borderBottom: "1px solid #161616",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-red"
            style={{
              marginTop: 16,
              background: "#E11414",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "14px 20px",
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            REQUEST INVESTOR ACCESS
          </a>
        </nav>
      )}
    </div>
  );
}
