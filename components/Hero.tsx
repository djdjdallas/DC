"use client";

import { useState } from "react";
import ImageSlot from "./ImageSlot";
import { heroImage, videoUrl } from "@/lib/data";

export default function Hero() {
  const [videoNote, setVideoNote] = useState("");

  const onWatchVideo = () => {
    if (videoUrl) window.open(videoUrl, "_blank");
    else setVideoNote("[ Video coming soon — tour video URL not set yet ]");
  };

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: 640,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <ImageSlot
          src={heroImage}
          alt="DirectCuts tour bus at dusk"
          label="Hero photo — tour bus at dusk"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 32px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            maxWidth: 620,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            pointerEvents: "auto",
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
            className="font-bebas"
            style={{
              margin: 0,
              fontSize: "clamp(56px, 7vw, 92px)",
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
              onClick={onWatchVideo}
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
                  fontSize: 9,
                  color: "#E11414",
                }}
              >
                ▶
              </span>
              WATCH THE VIDEO
            </button>
          </div>
          {videoNote && (
            <div style={{ color: "#9C9C9C", fontSize: 12 }}>{videoNote}</div>
          )}
        </div>
      </div>
    </section>
  );
}
