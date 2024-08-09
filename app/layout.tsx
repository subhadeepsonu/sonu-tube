import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReactQuearyProvider } from "@/utils/quaryprovider";
import { Toaster } from 'sonner'
import SideBar from "@/components/sideBar";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import BottomNav from "@/components/bottomNav";
export const metadata: Metadata = {
  title: "Sonu Tube",
  description: "Video Streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQuearyProvider>
        <Toaster richColors></Toaster>
        <NextTopLoader
 color="#A020F0"
 initialPosition={0.08}
 crawlSpeed={200}
 height={3}
 crawl={true}
 showSpinner={true}
 easing="ease"
 speed={200}
/>
        <Navbar></Navbar>
        <SideBar></SideBar>
        <BottomNav></BottomNav>
        {children}
        </ReactQuearyProvider>
        </body>
    </html>
  );
}
