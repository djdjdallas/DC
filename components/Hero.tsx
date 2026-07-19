"use client";

import { useState } from "react";
import ImageSlot from "./ImageSlot";
import VideoModal from "./VideoModal";
import { heroImage, videoUrl } from "@/lib/data";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="top"
      style={{
        background:
          "radial-gradient(ellipse at 75% 40%, #150808 0%, #000 55%), #000",
        overflow: "hidden",
      }}
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
        <div
          style={{
            flex: "1 1 440px",
            maxWidth: 620,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            data-hero-item
            className="font-bebas"
            style={{
              color: "#E11414",
              fontWeight: 700,
              letterSpacing: "0.22em",
              fontSize: 18,
            }}
          >
            48 STATES. 100 DAYS.
          </div>
          <h1
            data-hero-item
            className="font-bebas hero-title"
            style={{
              margin: 0,
              fontSize: "clamp(52px, 6vw, 84px)",
              lineHeight: 0.95,
              letterSpacing: 0.5,
              textWrap: "balance",
              fontWeight: 400,
            }}
          >
            THE FUTURE OF BARBERING STARTS{" "}
            <span style={{ color: "#E11414" }}>HERE.</span>
          </h1>
          <p
            data-hero-item
            style={{
              margin: 0,
              color: "#C9C9C4",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            DirectCuts is the on-demand barber marketplace connecting customers
            with professional barbers anytime, anywhere. We&apos;re building
            more than an app. We&apos;re building a movement.
          </p>
          <div data-hero-item style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="btn-red"
              style={{
                background: "#E11414",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "15px 26px",
                borderRadius: 4,
              }}
            >
              INVEST IN DIRECTCUTS
            </a>
            <button
              onClick={() => setVideoOpen(true)}
              className="btn-outline"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid #3A3A3A",
                color: "#F2F2F0",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "15px 26px",
                borderRadius: 4,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1.5px solid #E11414",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {/* nudged right so the triangle sits optically centered */}
                <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true" style={{ marginLeft: 1.5 }}>
                  <polygon points="0,0 8,5 0,10" fill="#E11414" />
                </svg>
              </span>
              WATCH THE VIDEO
            </button>
          </div>
          {videoOpen && (
            <VideoModal src={videoUrl} onClose={() => setVideoOpen(false)} />
          )}
        </div>

        <div
          data-hero-item
          style={{
            flex: "1 1 420px",
            minWidth: 0,
            position: "relative",
          }}
        >
          <ImageSlot
            src={heroImage}
            alt="DirectCuts branded tour bus at dusk surrounded by a crowd, city skyline behind"
            label="Hero photo — tour bus at dusk"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "4 / 3",
              borderRadius: 12,
              border: "1px solid #222",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(225,20,20,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 20,
              background: "rgba(8,8,8,0.85)",
              backdropFilter: "blur(6px)",
              border: "1px solid #2A2A2A",
              borderRadius: 8,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#E11414",
                flexShrink: 0,
              }}
            />
            <span
              className="font-bebas"
              style={{ fontSize: 16, letterSpacing: 1.5, whiteSpace: "nowrap" }}
            >
              THE TOUR IS COMING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
