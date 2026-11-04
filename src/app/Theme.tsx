"use client";

import React from "react";
import Contact from "@/component/Contact";
import Hero from "@/component/Hero";
import MagneticCursor from "@/component/layout/MagneticCursor";
import Navbar from "@/component/layout/Navbar";
import Profile from "@/component/Profile";
import Projects from "@/component/project/Projects";
import Experience from "@/component/Experience";
import { SmoothScrollProvider } from "@/component/providers/SmoothScrollProvider";

function Theme() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#050908] text-white selection:bg-white selection:text-black">
        <MagneticCursor />
        <Navbar />
        <Hero />
        <Projects />
        <Profile />
        <Experience />
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}

export default Theme;
