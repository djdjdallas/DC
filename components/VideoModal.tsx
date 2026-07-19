"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Lightbox video player. Only mounted after the user clicks — the video
 * element (and its network request) doesn't exist until then.
 */
export default function VideoModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="DirectCuts tour video"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "min(960px, 100%)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: "absolute",
            top: -44,
            right: 0,
            background: "none",
            border: "1px solid #3A3A3A",
            borderRadius: 4,
            width: 36,
            height: 36,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#F2F2F0",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <g stroke="#F2F2F0" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="2" y2="12" />
            </g>
          </svg>
        </button>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            display: "block",
            borderRadius: 10,
            border: "1px solid #2A2A2A",
            background: "#000",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </div>,
    document.body
  );
}
