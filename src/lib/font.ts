import { Inter , Playfair_Display } from "next/font/google";


export const playfairDisplay = Playfair_Display({
    variable:"--font-playfair-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export const inter = Inter({
    variable:"--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})