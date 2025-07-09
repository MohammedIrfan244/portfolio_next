"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { playfairDisplay, inter } from '@/lib/font'
import Image from 'next/image'




function Profile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = useState<number>(0)
  const [headingScale, setHeadingScale] = useState<number>(1)

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY: number = window.scrollY
      const scrollDirection: 'up' | 'down' = currentScrollY > scrollY ? 'down' : 'up'
      setScrollY(currentScrollY)

      const container = containerRef.current
      const heading = headingRef.current
      if (!container || !heading) return

      const viewportHeight: number = window.innerHeight

      const headingRect = heading.getBoundingClientRect()
      const headingTop = headingRect.top
      const headingHeight = headingRect.height

      const scrollProgress = Math.max(0, -headingTop / (headingHeight + viewportHeight * 0.5))
      const minScale = 0.3
      const maxScale = 1
      const newScale = Math.max(minScale, maxScale - scrollProgress * (maxScale - minScale))

      setHeadingScale(newScale)


      const sections: NodeListOf<Element> = container.querySelectorAll('[data-reveal]')
      const newVisibleSections = new Set<string>()

      sections.forEach((section: Element) => {
        const sectionRect: DOMRect = section.getBoundingClientRect()
        const sectionTop: number = sectionRect.top
        const sectionBottom: number = sectionRect.bottom


        const revealThreshold: number = viewportHeight * 0.8
        const hideThreshold: number = viewportHeight * 0.3

        const sectionId: string | null = section.getAttribute('data-reveal')
        if (!sectionId) return

        if (scrollDirection === 'down') {
          if (sectionTop < revealThreshold) {
            newVisibleSections.add(sectionId)
          }
        } else {
          if (sectionBottom > hideThreshold) {
            newVisibleSections.add(sectionId)
          }
        }
      })

      setVisibleSections(newVisibleSections)
    }


    window.addEventListener('scroll', handleScroll)


    handleScroll()


    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(2px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <div ref={containerRef} id="profile" className="px-6 md:px-7 lg:px-10 py-10 rounded-3xl md:rounded-4xl w-full bg-white">
      <div className="flex items-center gap-6 relative">
  <motion.h1
    ref={headingRef}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      scale: headingScale,
      transformOrigin: 'left top'
    }}
    className={`${playfairDisplay.className} text-[220px] sm:text-[300px] md:text-[350px] text-stone-800 lg:text-[400px]`}
  >
    Me.
  </motion.h1>

  <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 ,delay:0.2}}
   className="relative w-[100px] sm:w-[140px] md:w-[160px] lg:w-[180px] aspect-square grayscale rounded-full overflow-hidden shadow-md">
  <Image
    src="/images/profile.png"
    alt="Profile"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100px, (max-width: 1024px) 140px, 180px"
  />
</motion.div>

</div>


      <div className={`${inter.className} text-sm sm:text-base md:text-lg space-y-16 sm:space-y-20 md:space-y-28 pb-6 sm:pb-12 md:pb-16 lg:pb-20`}>
        <motion.div
          data-reveal="whoami"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has('whoami') ? 'visible' : 'hidden'}
        >
          <h3 className="font-semibold text-stone-700">Who Am I</h3>
          <p className='text-xs sm:text-sm leading-relaxed md:leading-loose text-stone-600 font-semibold md:text-base'>
            I&apos;m Mohammed Irfan, from Malappuram, Kerala. I graduated in Mathematics from the University of Calicut
            and transitioned into web development. I&apos;ve completed an internship at Bridgeon Solutions, contributing
            to a couple of real-world projects using the MERN stack.
          </p>
        </motion.div>

        <motion.div
          data-reveal="whatido"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has('whatido') ? 'visible' : 'hidden'}
        >
          <h3 className="font-semibold text-stone-700">What I Do</h3>
          <p className='text-xs sm:text-sm text-stone-600 font-semibold md:text-base leading-relaxed md:leading-loose'>
            I build full-stack web applications — both frontend and backend. While I enjoy all aspects of development,
            I&apos;m especially drawn to backend logic. I work with{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-orange-800 mx-0.5">JavaScript</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mx-0.5">TypeScript</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mx-0.5">React</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mx-0.5">Next.js</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mx-0.5">Node.js</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mx-0.5">Express.js</span>{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mx-0.5">MongoDB</span>, and tools like{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-fuchsia-800 mx-0.5">Git </span>  {' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-cyan-800 mx-0.5">Redux , </span> {' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 mx-0.5">Zustand</span> and{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mx-0.5">Tailwind CSS</span>{' '}
            to ship production-ready projects. Several of my builds (which you might’ve already seen) demonstrate how I apply these technologies to deliver scalable, maintainable results.
          </p>

        </motion.div>

        <motion.div
          data-reveal="outside"
          className="space-y-4 md:space-y-7"
          variants={sectionVariants}
          initial="hidden"
          animate={visibleSections.has('outside') ? 'visible' : 'hidden'}
        >
          <h3 className="font-semibold text-stone-700">
            Outside the Terminal <span className="italic text-sm text-stone-500">(not relevant)</span>
          </h3>
          <p className='text-xs sm:text-sm text-stone-600 font-semibold md:text-base leading-relaxed md:leading-loose'>
            Outside of work, I don&apos;t have a fixed hobby — but music is always on, even when I&apos;m coding. I also enjoy
            sketching people and scenes in pencil. I&apos;m no artist, but the pencil doesn&apos;t mind.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile