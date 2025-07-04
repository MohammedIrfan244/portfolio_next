import { Young_Serif } from "next/font/google";
import { Montserrat } from "next/font/google";


export const youngSerif = Young_Serif({
    variable: "--font-young-serif",
    subsets: ["latin"],
    weight: ["400"],
    });

export const montserrat = Montserrat({
    variable:"--font-montserrat",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})