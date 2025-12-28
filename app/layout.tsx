import { Albert_Sans, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  variable: "--font-tenor-sans",
  display: "swap",
  weight: "400",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={`${albertSans.variable} ${tenorSans.variable} antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
