import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskemon",
  description: "Gerencie suas tarefas com diversão estilo Pokémon!",
  generator: "Next.js",
  keywords: ["nextjs", "next15", "pwa", "next-pwa"],
  themeColor: "#fff",
  authors: [
    {
      name: "Myst1 Dev",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  // viewport:
  //   "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: {
    icon: ["/icon-192x192.png", "/icon-512x512.png"],
  },
  manifest: "/manifest.ts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EdgeStoreProvider>
          {children}
          <ToastContainer position="top-right" theme="light" />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
