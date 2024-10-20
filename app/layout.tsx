import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReactQuearyProvider } from "@/utils/quaryprovider";
import { Toaster } from 'sonner'
import SideBar from "@/components/sideBar";
const inter = Inter({ subsets: ["latin"] });
import BottomNav from "@/components/bottomNav";
import { ThemeProvider } from "@/components/theme-provider";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <Navbar></Navbar>
            <SideBar></SideBar>
            <BottomNav></BottomNav>
            {children}
          </ThemeProvider>
        </ReactQuearyProvider>
      </body>
    </html>
  );
}
