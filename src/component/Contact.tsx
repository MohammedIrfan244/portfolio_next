"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";
import { FiPhoneCall, FiGithub, FiLinkedin, FiDownload, FiCheck, FiCopy, FiArrowUp } from "react-icons/fi";
import { useLenis } from "@/component/providers/SmoothScrollProvider";

function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const lenis = useLenis();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("irfanndmb@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollTop = () => {
    if (lenis) {
      lenis.scrollTo("top", {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full px-6 py-16 sm:py-20 md:py-28 lg:py-32 md:px-8 lg:px-12 text-white bg-[#050908] overflow-hidden"
    >
      {/* Editorial Meta Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 border-b border-stone-800/80 pb-4 mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <span className="text-stone-300 font-semibold">// 04</span>
          <span>DIRECT INQUIRIES & COLLABORATION</span>
        </div>
        <div className="hidden sm:block">
          <span>[ OPEN FOR GLOBAL CONTRACTS ]</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-16 md:space-y-24 max-w-5xl mx-auto text-center"
      >
        <motion.h2
          className={`flicker text-[70px] sm:text-[120px] md:text-[160px] lg:text-[190px] leading-none tracking-tight font-medium ${playfairDisplay.className}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Build.
        </motion.h2>

        <div className="space-y-8 md:space-y-12">
          <p className={`text-stone-400 text-sm sm:text-base md:text-lg font-mono uppercase tracking-widest ${inter.className}`}>
            Direct Email Line:
          </p>

          {/* Interactive Copyable Email Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="mailto:irfanndmb@gmail.com"
              whileHover={{ scale: 1.02 }}
              className={`inline-block text-2xl sm:text-4xl md:text-5xl font-medium text-white hover:text-stone-300 transition-colors ${playfairDisplay.className}`}
            >
              irfanndmb@gmail.com
            </motion.a>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/20 border border-white/10 text-stone-300 hover:text-white transition-all duration-300"
            >
              {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
            </button>
          </div>

          {copied && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-mono text-emerald-400 tracking-wider block"
            >
              ✓ Copied to clipboard
            </motion.span>
          )}

          {/* Social Channels Dock */}
          <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="tel:+918891555811"
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/15 border border-white/10 text-stone-200 hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300"
            >
              <FiPhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 889155 5811</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MohammedIrfan244"
              aria-label="GitHub Profile"
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/15 border border-white/10 text-stone-200 hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300"
            >
              <FiGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mohammed-irfan-n"
              aria-label="LinkedIn Profile"
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/15 border border-white/10 text-stone-200 hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300"
            >
              <FiLinkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/files/MohammedIrfan.pdf"
              download={true}
              aria-label="Download Resume"
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.08] hover:bg-white/20 border border-white/15 text-stone-100 hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300"
            >
              <FiDownload className="w-3.5 h-3.5 text-amber-400" />
              <span>Curriculum Vitae</span>
            </a>
          </div>
        </div>

        {/* Minimalist Single Scroll-Up Action (Cleaned from copyright & tech stack) */}
        <div className="pt-20 sm:pt-28 border-t border-stone-800/60 flex items-center justify-center">
          <motion.button
            onClick={handleScrollTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-all duration-300 text-xs font-mono tracking-widest uppercase cursor-pointer"
          >
            <span>Back to Top</span>
            <span className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <FiArrowUp className="w-3.5 h-3.5 text-white transition-transform group-hover:-translate-y-0.5 duration-300" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
