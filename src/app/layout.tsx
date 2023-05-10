import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fenix•Calc",
  description: "Fenix Calc is a tool to help you calculate your Fenix payout.",
  icons: {
    icon: [{ url: "/images/icons/icon.png" }, new URL("/images/icons/icon.png", "https://fenixcalc.com")],
    shortcut: ["/images/icons/favicon.ico"],
    apple: [
      { url: "/images/icons/icon@60.png" },
      { url: "/images/icons/icon@152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/icons/icon@180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/images/icons/icon@180.png",
      },
    ],
  },
  category: "cryptocurrency",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="primary-background">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
