"use client";
import Contact from "@/component/Contact";
import Hero from "@/component/Hero";
import MagneticCursor from "@/component/layout/MagneticCursor";
import Navbar from "@/component/layout/Navbar";
import Profile from "@/component/Profile";
import Projects from "@/component/project/Projects";
import Experience from "@/component/Experience";
import { useLenisScroll } from "@/lib/hooks/useLenisScroll";
import React from "react";

function Theme() {
  useLenisScroll();
  return (
    <>
      <MagneticCursor />
      <Navbar />
      <Hero />
      <Projects />
      <Profile />
      <Experience />
      <Contact />
    </>
  );
}

export default Theme;
