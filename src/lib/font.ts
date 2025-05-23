import { Geist, Geist_Mono, Inter, Roboto, Lora, Poppins } from "next/font/google";

// Import and configure fonts
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Optionally, export an array of all font variables for easy use in className
export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  inter.variable,
  roboto.variable,
  lora.variable,
  poppins.variable,
];

// Optionally, export a mapping for convenience
export const fontMap = {
  geistSans,
  geistMono,
  inter,
  roboto,
  lora,
  poppins,
};
