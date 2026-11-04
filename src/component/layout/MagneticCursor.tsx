"use client";

import { useEffect, useRef } from "react";

export default function UltraFluidCursor() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot) return;

    // Use current viewport center as starting point
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    let isViewMode = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Direct pointer dot placement - instantaneous 1:1 response
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Check contextual target without triggering React re-renders
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const shouldView = target?.getAttribute("data-cursor") === "view";

      if (shouldView !== isViewMode) {
        isViewMode = shouldView;
        if (isViewMode) {
          circle.classList.add("cursor-view-active");
        } else {
          circle.classList.remove("cursor-view-active");
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId: number;

    const tick = () => {
      // Snappy, ultra-responsive lerp factor (0.24 = immediate response, zero sluggish lag)
      const lerp = 0.24;
      posX += (mouseX - posX) * lerp;
      posY += (mouseY - posY) * lerp;

      const dx = mouseX - posX;
      const dy = mouseY - posY;
      const speed = Math.hypot(dx, dy);

      if (isViewMode) {
        // In view mode, stable circle so text is sharp
        circle.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(1.6)`;
      } else {
        // Fluid subtle squish that immediately relaxes
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const squish = Math.min(speed * 0.015, 0.45);
        const scaleX = 1 + squish;
        const scaleY = 1 - squish * 0.6;

        circle.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .cursor-blob {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          mix-blend-mode: difference;
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          will-change: transform;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
          transition: width 0.2s ease, height 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-view-active {
          width: 76px !important;
          height: 76px !important;
          background: white !important;
          box-shadow: 0 0 28px rgba(255, 255, 255, 0.6) !important;
        }

        .cursor-view-text {
          opacity: 0;
          color: black;
          font-family: monospace;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.1em;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.15s ease;
        }

        .cursor-view-active .cursor-view-text {
          opacity: 1;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          mix-blend-mode: difference;
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
          will-change: transform;
        }

        .cursor-view-active ~ .cursor-dot {
          opacity: 0;
        }
      `}</style>

      {/* Main Responsive Fluid Blob */}
      <div ref={circleRef} className="cursor-blob hidden md:flex">
        <span className="cursor-view-text">VIEW ↗</span>
      </div>

      {/* Center 1:1 Instant Pointer Dot */}
      <div ref={dotRef} className="cursor-dot hidden md:inline-block" />
    </>
  );
}
