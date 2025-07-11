import { IProject } from "../types"

const projects: IProject[] = [
  {
    id: "1keyone",
    title: "Scopeo Website Monitor",
    video: "/videos/scopeo.mp4",
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
    live: "https://scopeo-monitor.vercel.app/"
  },
  {
    id: "2keytwo",
    title: "Pymedaca - The Digital Classroom",
    video: "/videos/pymedaca.mp4",
    cover: "/images/pymedacacover.jpg",
    dep: [
      { id: "7", tool: "Express", color: "bg-gray-900" },
      { id: "8", tool: "Next.js", color: "bg-blue-900" },
      { id: "9", tool: "MongoDb", color: "bg-emerald-900" }
    ],
    github: "https://github.com/MohammedIrfan244/pymedaca_client",
    live: "https://pymedaca-client.vercel.app/"
  },
  {
    id: "4keyfour",
    title: "Instagam Clone",
    video: "/videos/instagram.mp4",
    cover: "/images/instagramcover.jpg",
    dep: [
      { id: "10", tool: "React js", color: "bg-sky-900" },
      { id: "11", tool: "Express", color: "bg-gray-900" },
      { id: "12", tool: "MongoDb", color: "bg-emerald-900" },
      { id: "13", tool: "Socket.io", color: "bg-yellow-900" }
    ],
    github: "https://github.com/MohammedIrfan244/instagram_clone/",
    live: "https://instagram-clone-z.vercel.app/"
  },
  {
    id: "5keyfive",
    title: "Aura Fashion Blog",
    video: "/videos/aura.mp4",
    cover: "/images/auracover.jpg",
    dep: [
      { id: "14", tool: "React js", color: "bg-sky-900" },
      { id: "15", tool: "Express", color: "bg-gray-900" },
      { id: "16", tool: "MongoDb", color: "bg-emerald-900" },
      { id: "17", tool: "Javascript", color: "bg-amber-900" }
    ],
    github: "https://github.com/MOhammedIrfan244/aura-fashion-blog/",
    live: "https://aura-fashion-blog.vercel.app/"
  }
]

export default projects
