"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";

function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );
  const [scrollY, setScrollY] = useState<number>(0);
  const [headingScale, setHeadingScale] = useState<number>(1);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY: number = window.scrollY;
      const scrollDirection: "up" | "down" =
        currentScrollY > scrollY ? "down" : "up";
      setScrollY(currentScrollY);

      const container = containerRef.current;
      const heading = headingRef.current;
      if (!container || !heading) return;

      const viewportHeight: number = window.innerHeight;

      const headingRect = heading.getBoundingClientRect();
      const headingTop = headingRect.top;
      const headingHeight = headingRect.height;

      const scrollProgress = Math.max(
        0,
        -headingTop / (headingHeight + viewportHeight * 0.5),
      );
      const minScale = 1;
      const maxScale = 2;
      const newScale = Math.min(
        maxScale,
        minScale + scrollProgress * (maxScale - minScale),
      );

      setHeadingScale(newScale);

      const sections: NodeListOf<Element> =
        container.querySelectorAll("[data-reveal]");
      const newVisibleSections = new Set<string>();

      sections.forEach((section: Element) => {
        const sectionRect: DOMRect = section.getBoundingClientRect();
        const sectionTop: number = sectionRect.top;
        const sectionBottom: number = sectionRect.bottom;

        const revealThreshold: number = viewportHeight * 0.8;
        const hideThreshold: number = viewportHeight * 0.3;

        const sectionId: string | null = section.getAttribute("data-reveal");
        if (!sectionId) return;

        if (scrollDirection === "down") {
          if (sectionTop < revealThreshold) {
            newVisibleSections.add(sectionId);
          }
        } else {
          if (sectionBottom > hideThreshold) {
            newVisibleSections.add(sectionId);
          }
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      id="profile"
      className="px-6 md:px-7 lg:px-10 py-10 rounded-3xl md:rounded-4xl w-full bg-white"
    >
      <div className="w-full overflow-x-hidden hide-scrollbar">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${playfairDisplay.className} text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px]
    text-stone-800 font-bold px-3`}
        >
          About
        </motion.h2>
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ scale: headingScale, transformOrigin: "left bottom" }}
          className={`${playfairDisplay.className}
    text-[220px] sm:text-[300px] md:text-[350px] lg:text-[400px]
    text-stone-800
    leading-none
    -mt-8
  `}
        >
          Me.
        </motion.h2>
      </div>
      <div
        className={`${inter.className} text-sm sm:text-base md:text-lg space-y-16 sm:space-y-20 md:space-y-28 py-6 sm:py-12 md:pb-16 lg:pb-20`}
      >
        <motion.div
          data-reveal="whoami"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has("whoami") ? "visible" : "hidden"}
        >
          <h3 className="font-semibold text-stone-700">Who Am I</h3>
          <p className="text-xs sm:text-sm leading-relaxed text-stone-600 font-semibold md:text-base">
            I&apos;m <span className="font-bold text-black">Mohammed Irfan</span>. Currently a{" "}
            <span className="font-bold text-black">Freelance Web Developer</span> building scalable applications with Next.js and TypeScript. 
            <br className="hidden sm:block" />
            Previously, I built production-scale ERP & CRM platforms as a{" "}
            <span className="font-bold text-black">Full-Stack Developer at Willowy Infotech</span>, and delivered MERN stack projects during a 1-year internship at BridgeOn.
          </p>
        </motion.div>

        <motion.div
          data-reveal="whatido"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has("whatido") ? "visible" : "hidden"}
        >
          <h3 className="font-semibold text-stone-700">What I Do</h3>
          <p className="text-xs sm:text-sm text-stone-600 font-semibold md:text-base leading-relaxed">
            I specialize in the <span className="font-bold text-black">MERN stack & Next.js</span>. I architect and develop secure, modular RESTful APIs and performant SSR/SSG web applications.
            <br className="hidden sm:block" />
            My core stack includes{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-gray-100 text-gray-800 mx-0.5">Next.js</span>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-purple-100 text-purple-800 mx-0.5">TypeScript</span>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-green-100 text-green-800 mx-0.5">Node.js</span>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 mx-0.5">MongoDB</span>
            , along with <span className="font-bold text-black">Prisma, Express, React,</span> and state management tools like Redux & Zustand. I focus on database optimization, secure authentication, and scalable deployment.
          </p>
        </motion.div>

        <motion.div
          data-reveal="outside"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has("outside") ? "visible" : "hidden"}
        >
          <h3 className="font-semibold text-stone-700">
            Outside the Terminal{" "}
            <span className="italic text-sm text-stone-500">
              (not relevant)
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-semibold md:text-base leading-loose">
            Outside of work, I don&apos;t have a fixed hobby — but music is
            always on, even when I&apos;m coding. I also like to read books and
            enjoy sketching people and scenes in pencil. I&apos;m no artist, but
            the pencil doesn&apos;t mind.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
