"use client";

import { useEffect, useRef } from "react";

export default function UltraFluidCursor() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    let isViewMode = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 1:1 Instant hardware pointer dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Check contextual target without React re-renders
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
      // Super-fast, instantaneous lerp (0.45 = locked tightly to mouse, zero lag)
      const lerp = 0.45;
      posX += (mouseX - posX) * lerp;
      posY += (mouseY - posY) * lerp;

      const dx = mouseX - posX;
      const dy = mouseY - posY;
      const speed = Math.hypot(dx, dy);

      if (isViewMode) {
        // Fast, crisp circular VIEW pill tracking the mouse with zero sluggishness
        circle.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(1.65)`;
      } else {
        // Fluid squish that relaxes immediately
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const squish = Math.min(speed * 0.015, 0.4);
        const scaleX = 1 + squish;
        const scaleY = 1 - squish * 0.5;

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
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fafaf9;
          mix-blend-mode: difference;
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          will-change: transform;
          box-shadow: 0 0 16px rgba(250, 250, 249, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          /* No width/height transition that causes layout reflow lag */
        }

        .cursor-view-active {
          box-shadow: 0 0 24px rgba(250, 250, 249, 0.55) !important;
        }

        .cursor-view-text {
          opacity: 0;
          color: #0c0a09;
          font-family: monospace;
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.12em;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.1s ease;
        }

        .cursor-view-active .cursor-view-text {
          opacity: 1;
        }

        .cursor-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fafaf9;
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

      {/* Main Fluid Responsive Blob */}
      <div ref={circleRef} className="cursor-blob hidden md:flex">
        <span className="cursor-view-text">VIEW ↗</span>
      </div>

      {/* 1:1 Instant Pointer Dot */}
      <div ref={dotRef} className="cursor-dot hidden md:inline-block" />
    </>
  );
}
