"use client";

import { useEffect, useRef, useState } from "react";

export default function UltraFluidCursor() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [cursorType, setCursorType] = useState<"default" | "view" | "pointer">("default");

  useEffect(() => {
    const circleElement = circleRef.current;
    const dotElement = dotRef.current;
    if (!circleElement || !dotElement) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const velocity = { x: 0, y: 0 };
    const acceleration = { x: 0, y: 0 };

    const scale = { x: 1, y: 1 };
    let rotation = 0;
    let squish = 0;
    let currentType: "default" | "view" | "pointer" = "default";

    const moveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Detect contextual cursor targets
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const detected = target ? (target.getAttribute("data-cursor") as "default" | "view" | "pointer") : null;

      const interactive = (e.target as HTMLElement)?.closest?.("a, button, input, textarea");

      let nextType: "default" | "view" | "pointer" = "default";
      if (detected === "view") {
        nextType = "view";
      } else if (detected === "pointer" || interactive) {
        nextType = "pointer";
      }

      if (nextType !== currentType) {
        currentType = nextType;
        setCursorType(nextType);
      }
    };

    window.addEventListener("mousemove", moveHandler, { passive: true });

    let rafId: number;

    const tick = () => {
      // Physics-based movement
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;

      // Spring acceleration
      acceleration.x = dx * 0.005;
      acceleration.y = dy * 0.005;

      velocity.x += acceleration.x;
      velocity.y += acceleration.y;

      // Friction
      velocity.x *= 0.88;
      velocity.y *= 0.88;

      pos.x += velocity.x;
      pos.y += velocity.y;

      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

      if (speed > 0.1) {
        const targetRotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
        const rotDiff = ((((targetRotation - rotation + 180) % 360) + 360) % 360) - 180;
        rotation += rotDiff * 0.3;
      }

      // If in "view" mode, keep it circular and stable so text is legible
      if (currentType === "view") {
        scale.x += (1.6 - scale.x) * 0.2;
        scale.y += (1.6 - scale.y) * 0.2;
        rotation += (0 - rotation) * 0.2;
      } else if (currentType === "pointer") {
        scale.x += (1.3 - scale.x) * 0.2;
        scale.y += (1.3 - scale.y) * 0.2;
      } else {
        const targetSquish = Math.min(speed * 0.045, 2.0);
        squish += (targetSquish - squish) * 0.2;

        const scaleX = 1 + squish * 1.1;
        const scaleY = Math.max(1 - squish * 0.8, 0.25);

        scale.x += (scaleX - scale.x) * 0.2;
        scale.y += (scaleY - scale.y) * 0.2;
      }

      circleElement.style.transform = `
        translate3d(${pos.x}px, ${pos.y}px, 0)
        translate(-50%, -50%)
        rotate(${rotation}deg)
        scale(${scale.x}, ${scale.y})
      `;

      dotElement.style.transform = `
        translate3d(${mouse.x}px, ${mouse.y}px, 0)
        translate(-50%, -50%)
      `;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes blob {
          0%, 100% { border-radius: 50% 45% 47% 53% / 53% 47% 45% 50%; }
          25% { border-radius: 47% 53% 50% 45% / 45% 50% 53% 47%; }
          50% { border-radius: 53% 47% 45% 50% / 50% 45% 47% 53%; }
          75% { border-radius: 45% 50% 53% 47% / 47% 53% 50% 45%; }
        }
        .blob-cursor {
          animation: blob 4s ease-in-out infinite;
        }
        .view-cursor {
          border-radius: 9999px !important;
          animation: none !important;
        }
      `}</style>

      {/* Main fluid blob / contextual pill */}
      <div
        ref={circleRef}
        className={`hidden md:flex items-center justify-center fixed top-0 left-0 w-12 h-12 bg-white pointer-events-none mix-blend-difference z-50 transition-[width,height] duration-200 ${
          cursorType === "view" ? "view-cursor !w-20 !h-20" : "blob-cursor"
        }`}
        style={{
          willChange: "transform",
          filter: "blur(0.5px)",
          boxShadow: "0 0 24px rgba(255,255,255,0.35)",
        }}
      >
        <span
          ref={textRef}
          className={`font-mono font-bold text-[10px] tracking-widest text-black select-none pointer-events-none transition-opacity duration-200 ${
            cursorType === "view" ? "opacity-100" : "opacity-0"
          }`}
        >
          VIEW ↗
        </span>
      </div>

      {/* Center dot at exact mouse pointer */}
      <div
        ref={dotRef}
        className={`fixed top-0 hidden md:inline-block left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none mix-blend-difference z-[51] transition-opacity duration-200 ${
          cursorType === "view" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          willChange: "transform",
          boxShadow: "0 0 6px rgba(255,255,255,0.9)",
        }}
      />
    </>
  );
}
