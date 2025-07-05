import { Young_Serif } from "next/font/google";
import { Inter } from "next/font/google";


export const youngSerif = Young_Serif({
    variable: "--font-young-serif",
    subsets: ["latin"],
    weight: ["400"],
    });

export const inter = Inter({
    variable:"--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})