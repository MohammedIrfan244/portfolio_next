import { IProject } from "../types"

const projects: IProject[] = [
  {
    id: "2keytwo",
    title: "DURIO - Cross-Platform Personal Productivity Platform",
    description: "A full-stack productivity platform built with Next.js, shipping on both web and Android from a single codebase.",
    cover: "/images/duriocover.png",
    dep: [
      { id: "8", tool: "Next.js", color: "bg-blue-900" },
      { id: "7", tool: "Prisma", color: "bg-gray-900" },
      { id: "9", tool: "MongoDb", color: "bg-emerald-900" },
      { id: "100", tool: "NextAuth.js", color: "bg-indigo-900" },
      { id: "101", tool: "Capacitor", color: "bg-cyan-900" },
      { id: "102", tool: "Firebase", color: "bg-orange-900" }
    ],
    github: "https://github.com/MohammedIrfan244/to-do-app/",
    live: "https://durio.vercel.app/"
  },
  {
    id: "1keyone",
    title: "SCOPEO - Real-Time Monitoring & Error Analysis",
    description: "A full-stack monitoring platform and Node.js SDK for tracking server health, uptime, and application errors.",
    cover: "/images/monitorcover.png",
    dep: [
      { id: "1", tool: "Next.js", color: "bg-yellow-900" },
      { id: "2", tool: "TypeScript", color: "bg-cyan-900" },
      { id: "3", tool: "Express", color: "bg-gray-900" },
      { id: "4", tool: "MongoDB", color: "bg-emerald-900" },
      { id: "5", tool: "Scocket.io", color: "bg-blue-900" },
      { id: "6", tool: "Npm", color: "bg-red-900" },
    ],
    github: "https://github.com/scopeo-tech/scopeo-monitor/",
    live: "https://github.com/scopeo-tech/scopeo-monitor/"
  },
  {
    id: "4keyfour",
    title: "Instagam Clone",
    description: "A social media platform featuring follow relationships, a personalized feed, and real-time messaging & notifications via WebSockets.",
    cover: "/images/instagramcover.jpg",
    dep: [
      { id: "10", tool: "React js", color: "bg-sky-900" },
      { id: "11", tool: "Express", color: "bg-gray-900" },
      { id: "12", tool: "MongoDb", color: "bg-emerald-900" },
      { id: "13", tool: "Socket.io", color: "bg-yellow-900" }
    ],
    github: "https://github.com/MohammedIrfan244/instagram_clone/",
    live: "https://instagram-clone-z.vercel.app/",
    bullets: [
      "Real-time messaging via WebSockets",
      "Follow-based personalized feed",
      "Responsive social media UI"
    ]
  },
  {
    id: "5keyfive",
    title: "Aura Fashion Blog",
    description: "A platform to explore fashion products from popular brands and learn about fashion & lifestyle from creators.",
    cover: "/images/aurablogcover.jpg",
    dep: [
      { id: "14", tool: "React js", color: "bg-sky-900" },
      { id: "15", tool: "Express", color: "bg-gray-900" },
      { id: "16", tool: "MongoDb", color: "bg-emerald-900" },
      { id: "17", tool: "Javascript", color: "bg-amber-900" }
    ],
    github: "https://github.com/MOhammedIrfan244/aura-fashion-blog/",
    live: "https://aura-fashion-blog.vercel.app/",
    bullets: [
      "Product exploration by popular brands",
      "Lifestyle and fashion creator blogs",
      "Dynamic content management"
    ]
  }
]

export default projects
