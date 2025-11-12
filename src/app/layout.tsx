import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nunito_Sans } from 'next/font/google';
import "./globals.css";
import SessionProvider from "./components/SessionProvider";

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // you can adjust
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Hiring Apps",
  description: "This is a Hiring Management Web App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
        <body>
          <SessionProvider>
            {children}
          </SessionProvider>
        </body>
    </html>
  )
}
