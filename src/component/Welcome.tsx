"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

function Welcome() {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseEventWithClient) => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - elementCenterX;
      const deltaY = mouseY - elementCenterY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // More generous magnetic area
      const hoverArea = isHovering
        ? Math.max(rect.width, rect.height) 
        : Math.max(rect.width, rect.height) * 0.5;

      if (distance < hoverArea) {
        setIsHovering(true);
        setPosition({
          x: deltaX * 0.2,
          y: deltaY * 0.1, 
          rotation: deltaX * 0.02,
        });
      } else if (isHovering) {
        setIsHovering(false);
        setPosition({ x: 0, y: 0, rotation: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <motion.p
        ref={elementRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif cursor-pointer select-none"
        initial={{ opacity: 0, y: -80 }}
        animate={{
          opacity: 1,
          x: position.x,
          y: position.y,
          rotate: position.rotation,
        }}
        transition={{
          opacity: { duration: 0.6, ease: "easeInOut" },
          x: { duration: isHovering ? 0.4 : 0.6, ease: "easeOut" },
          y: { duration: isHovering ? 0.4 : 0.6, ease: "easeOut" },
          rotate: { duration: 0.5, ease: "easeOut" },
        }}
        style={{ transformOrigin: "center center" }}
      >
        Welcome
      </motion.p>
    </div>
  );
}

export default Welcome;
