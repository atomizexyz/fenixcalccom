import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fenix Calc",
  description: "Fenix Calc is a tool to help you calculate your Fenix payout.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="primary-background">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
