import { Albert_Sans, Tenor_Sans, Reddit_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./providers/authProvider";
import AuthGate from "./providers/authProvider";
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
const redditSans = Reddit_Sans({
  subsets: ["latin"],
  variable: "--font-reddit-sans",
  display: "swap",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={`${albertSans.variable} ${tenorSans.variable} ${redditSans.variable} antialiased`}
      >
        <AuthProvider>
          <AuthGate>
            <Toaster position="top-right" />
            {children}
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
