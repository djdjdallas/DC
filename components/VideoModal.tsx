"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

/**
 * Split-reveal video player. On open the screen dims, a red seam ignites
 * across the middle, and the page "tears open" — both halves slide away
 * to reveal the video behind it. Closing reverses the timeline so the
 * site seals shut again. Nothing (including the video element) exists
 * until the user clicks.
 */
export default function VideoModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closingRef = useRef(false);

  // animated close: reverse the reveal, then unmount
  const requestClose = () => {
    const tl = tlRef.current;
    if (!tl) return onClose();
    if (closingRef.current) return;
    closingRef.current = true;
    videoRef.current?.pause();
    tl.timeScale(1.6).reverse();
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      onReverseComplete: onClose,
    });
    tlRef.current = tl;

    if (reduced) {
      // no tearing — a plain fade
      tl.set(q(".split-panel"), { opacity: 0, pointerEvents: "none" })
        .set(q(".split-seam"), { opacity: 0 })
        .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          q(".split-video"),
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "<"
        )
        .set(q(".split-close"), { opacity: 1 });
    } else {
      tl
        // the lights dim: panels cover the page
        .fromTo(
          q(".split-panel"),
          { opacity: 0 },
          { opacity: 1, duration: 0.18, ease: "none" }
        )
        // the seam ignites across the middle
        .fromTo(
          q(".split-seam"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.42, ease: "power2.out" }
        )
        // tear open
        .add("split", "+=0.08")
        .to(q(".split-seam"), { opacity: 0, duration: 0.35 }, "split+=0.15")
        .to(
          q(".split-panel-top"),
          { yPercent: -100, duration: 0.95, ease: "power4.inOut" },
          "split"
        )
        .to(
          q(".split-panel-bottom"),
          { yPercent: 100, duration: 0.95, ease: "power4.inOut" },
          "split"
        )
        .fromTo(
          q(".split-video"),
          { scale: 0.93, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "split+=0.15"
        )
        .fromTo(
          q(".split-close"),
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.3 },
          "-=0.3"
        );
    }

    // start playback as the tear opens (the click gesture allows it)
    tl.call(
      () => {
        videoRef.current?.play().catch(() => {});
      },
      [],
      reduced ? 0.3 : "split+=0.2"
    );

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: "50.2%",
    background: "linear-gradient(180deg, #0A0A0A, #030303)",
    zIndex: 2,
  };

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="DirectCuts tour video"
      style={{ position: "fixed", inset: 0, zIndex: 100 }}
    >
      {/* video layer — revealed when the page tears open */}
      <div
        onClick={requestClose}
        className="split-video"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 50% 50%, #120808 0%, #000 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(960px, 100%)",
            aspectRatio: "16 / 9",
            display: "block",
            borderRadius: 10,
            border: "1px solid #2A2A2A",
            background: "#000",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
          }}
        />
      </div>

      {/* the two halves of the "page" */}
      <div
        className="split-panel split-panel-top"
        style={{ ...panelStyle, top: 0 }}
      />
      <div
        className="split-panel split-panel-bottom"
        style={{ ...panelStyle, bottom: 0 }}
      />

      {/* the seam that ignites before the tear */}
      <div
        className="split-seam"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 2,
          marginTop: -1,
          background:
            "linear-gradient(90deg, transparent, #E11414 12%, #FF3B3B 50%, #E11414 88%, transparent)",
          boxShadow: "0 0 24px rgba(225,20,20,0.9), 0 0 60px rgba(225,20,20,0.5)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <button
        onClick={requestClose}
        aria-label="Close video"
        className="split-close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 4,
          background: "rgba(8,8,8,0.7)",
          border: "1px solid #3A3A3A",
          borderRadius: 4,
          width: 40,
          height: 40,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#F2F2F0",
          opacity: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <g stroke="#F2F2F0" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </g>
        </svg>
      </button>
    </div>,
    document.body
  );
}
