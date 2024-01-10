import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chum",
  description: "Meet new people, make new friends.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#c8d3f7] to-[#bfaffc] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              {children}
            </div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
