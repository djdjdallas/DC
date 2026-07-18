"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll/entrance animations. Sections opt in with data attributes:
 *  - [data-hero-item]  hero entrance timeline on load
 *  - [data-reveal]     fade-up when scrolled into view
 *  - [data-stagger]    children fade-up with stagger
 *  - [data-phone]      phone mockup entrance + slow float
 * The tour map animates itself (components/TourRoute.jsx, vanilla rAF).
 */
export default function Animations() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // hero entrance
      gsap.from("[data-hero-item]", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });

      // section reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      // staggered children
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // phone mockup: entrance, then a slow idle float
      const phone = document.querySelector<HTMLElement>("[data-phone]");
      if (phone) {
        gsap.from(phone, {
          y: 80,
          opacity: 0,
          rotate: 3,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: phone, start: "top 85%" },
        });
        gsap.to(phone, {
          y: -10,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        });
      }

    });

    return () => mm.revert();
  }, []);

  return null;
}
