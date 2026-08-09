import { Oswald, Inter, Chakra_Petch, Caveat } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "AISH MEHAN | #1 Online Transformation Coach",
  description:
    "Discipline-driven elite online fitness coaching, personalized nutrition, and progressive physical conditioning. Designed for high-performing individuals.",
  keywords: [
    "Fitness Coaching",
    "Body Transformation",
    "Elite Training",
    "Online Coach",
    "Physique Conditioning",
    "Performance Optimization",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${chakra.variable} ${caveat.variable} ${inter.variable}`}
    >
      <body className="bg-near-black text-off-white antialiased font-sans selection:bg-khaki selection:text-near-black">
        {children}
      </body>
    </html>
  );
}
