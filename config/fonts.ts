import { Fira_Code as FontMono, Inter as FontSans, Orbitron, Poppins } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const Orbitronn = Orbitron({
  subsets: ['latin'], // Adjust for supported languages if needed
  display: 'swap', // Ensures smooth font loading
  // variable: {}, // Optional: Configure variable fonts if applicable
});

export {Orbitronn};

const Poppinss = Poppins({
  subsets: ['latin'], // Adjust for supported languages if needed
  display: 'swap',
  weight: "100"
});

export {Poppinss};
