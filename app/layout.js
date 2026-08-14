import Script from "next/script";
import { Oswald, Inter, Chakra_Petch, Caveat } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { ModalProvider } from "@/context/ModalContext";
import ApplicationModal from "@/components/ApplicationModal";

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
        {/* Google tag (gtag.js) - Google Ads & Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18343832558"
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18343832558');
              gtag('config', 'G-Z8KMK88MCB');

              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18343832558/BHfICPa90-AcEO7XgqtE',
                    'event_callback': callback
                });
                return false;
              }
              window.gtag_report_conversion = gtag_report_conversion;
            `,
          }}
        />
        <DataProvider>
          <ModalProvider>
            {children}
            <ApplicationModal />
          </ModalProvider>
        </DataProvider>
      </body>
    </html>
  );
}
