"use client";

import { useEffect, useRef } from "react";

export default function UltraFluidCursor() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

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

    const moveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", moveHandler);

    const tick = () => {
      // Physics-based movement
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      
      // Calculate acceleration (spring-like behavior) - FASTER
      acceleration.x = dx * 0.004;
      acceleration.y = dy * 0.004;
      
      // Apply acceleration to velocity
      velocity.x += acceleration.x;
      velocity.y += acceleration.y;
      
      // Apply drag/friction for smoothness - LESS DRAG = FASTER
      velocity.x *= 0.9;
      velocity.y *= 0.9;
      
      // Update position
      pos.x += velocity.x;
      pos.y += velocity.y;

      // Calculate speed for effects
      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      
      // Rotation based on velocity direction - FASTER rotation
      if (speed > 0.1) {
        const targetRotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
        const rotDiff = ((((targetRotation - rotation + 180) % 360) + 360) % 360) - 180;
        rotation += rotDiff * 0.3;
      }

      // Squish effect (more dramatic and THINNER)
      const targetSquish = Math.min(speed * 0.05, 2.5);
      squish += (targetSquish - squish) * 0.2;
      
      // Apply squish to scale - THINNER when moving
      const scaleX = 1 + squish * 1.2;
      const scaleY = Math.max(1 - squish * 0.85, 0.15);
      
      scale.x += (scaleX - scale.x) * 0.2;
      scale.y += (scaleY - scale.y) * 0.2;

      // Add slight wobble when moving fast
      const wobble = Math.sin(Date.now() * 0.01) * speed * 0.002;

      // Apply all transformations
      circleElement.style.transform = `
        translate3d(${pos.x}px, ${pos.y}px, 0) 
        translate(-50%, -50%)
        rotate(${rotation + wobble * 50}deg) 
        scale(${scale.x}, ${scale.y})
      `;

      // Update dot to actual mouse position (instant, no delay)
      dotElement.style.transform = `
        translate3d(${mouse.x}px, ${mouse.y}px, 0)
        translate(-50%, -50%)
      `;

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
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
      `}</style>
      {/* Main fluid blob */}
      <div 
        ref={circleRef} 
        className="blob-cursor fixed top-0 left-0 w-12 h-12 bg-white pointer-events-none mix-blend-difference z-50"
        style={{ 
          willChange: "transform",
          filter: "blur(1px)",
          boxShadow: "0 0 20px rgba(255,255,255,0.3)"
        }}
      />
      {/* Small dot at actual cursor position */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none mix-blend-difference z-[51]"
        style={{ 
          willChange: "transform",
          boxShadow: "0 0 4px rgba(255,255,255,0.8)"
        }}
      />
    </>
  );
}