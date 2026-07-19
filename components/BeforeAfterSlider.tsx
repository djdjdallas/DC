"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Draggable before/after comparison. Renders labeled placeholders until
 * both image paths are provided (see aiPreview in lib/data.ts).
 */
export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string | null;
  after: string | null;
  alt: string;
}) {
  const [pos, setPos] = useState(50); // divider position, percent
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const placeholder = (label: string, tint: string) => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: tint,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "#3D3D3D",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          border: "1px dashed #2A2A2A",
          borderRadius: 6,
          padding: "8px 12px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Compare original photo with AI haircut preview"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #222",
        background: "#0E0E0E",
        cursor: "ew-resize",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {/* before layer (full) */}
      {before ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={before}
          alt={alt}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        placeholder(
          "Drop original photo",
          "linear-gradient(160deg, #161616, #0D0D0D)"
        )
      )}

      {/* after layer, clipped to the divider */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 0 ${pos}%)`,
        }}
      >
        {after ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={after}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          placeholder(
            "AI preview pending",
            "linear-gradient(160deg, #1C0A0A, #120606)"
          )
        )}
      </div>

      {/* labels */}
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "rgba(8,8,8,0.8)",
          border: "1px solid #2A2A2A",
          borderRadius: 4,
          padding: "5px 10px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          pointerEvents: "none",
        }}
      >
        ORIGINAL
      </span>
      <span
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "rgba(225,20,20,0.9)",
          borderRadius: 4,
          padding: "5px 10px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#fff",
          pointerEvents: "none",
        }}
      >
        AI PREVIEW
      </span>

      {/* divider + handle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: "#E11414",
          transform: "translateX(-1px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#E11414",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
          <path
            d="M5 1 L1 5 L5 9 M11 1 L15 5 L11 9"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
